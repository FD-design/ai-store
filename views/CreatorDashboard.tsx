
import React, { useState, useEffect, useRef } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Bot, DollarSign, Upload, CheckCircle, TrendingUp, Edit3, Trash2, Plus, Globe, Code, Server, Github, Terminal, Loader2, Link as LinkIcon } from 'lucide-react';
import { AIApp, PricingModel, DeploymentType, DeploymentConfig, AppStatus } from '../types';
import { generateAppDescription, suggestPricing } from '../services/geminiService';
import { MOCK_PAYOUTS, MOCK_SALES_DATA } from '../constants';
import ConfirmModal from '../components/ConfirmModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal'; 

interface CreatorDashboardProps {
  myApps: AIApp[];
  onPublish: (app: AIApp, isUpdate: boolean) => void;
  onViewApp: (app: AIApp) => void;
  onDelete: (app: AIApp) => void; 
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ myApps, onPublish, onViewApp, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'my-apps' | 'publish' | 'payouts'>('overview');
  
  // Modal States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<AIApp | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  
  // Publish Wizard State
  const [step, setStep] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form Data
  const [appName, setAppName] = useState('');
  const [category, setCategory] = useState('生产力');
  const [deploymentType, setDeploymentType] = useState<DeploymentType>(DeploymentType.WEB_APP);
  
  // Deployment Source Logic
  const [deploySource, setDeploySource] = useState<'url' | 'github'>('url');
  const [repoUrl, setRepoUrl] = useState('');
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success' | 'error'>('idle');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const [apiDocs, setApiDocs] = useState('');
  const [helpDocs, setHelpDocs] = useState('');
  const [coreFunction, setCoreFunction] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [price, setPrice] = useState(0);
  const [pricingModel, setPricingModel] = useState<PricingModel>(PricingModel.FREE);
  const [aiTip, setAiTip] = useState('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [buildLogs]);

  const resetForm = () => {
      setStep(1);
      setEditingId(null);
      setAppName('');
      setCategory('生产力');
      setDeploymentType(DeploymentType.WEB_APP);
      setDeploySource('url');
      setRepoUrl('');
      setDeploymentUrl('');
      setBuildStatus('idle');
      setBuildLogs([]);
      setApiDocs('');
      setHelpDocs('');
      setCoreFunction('');
      setDescription('');
      setFeatures([]);
      setPrice(0);
      setPricingModel(PricingModel.FREE);
      setAiTip('');
  };

  const handleEditApp = (app: AIApp) => {
      setEditingId(app.id);
      setAppName(app.title);
      setCategory(app.category);
      setDeploymentType(app.deployment.type);
      setDeploymentUrl(app.deployment.url);
      if (app.deployment.repoUrl) {
          setDeploySource('github');
          setRepoUrl(app.deployment.repoUrl);
          setBuildStatus('success'); // Assume built if editing existing
      } else {
          setDeploySource('url');
      }
      setApiDocs(app.deployment.docsUrl || '');
      setHelpDocs(app.helpDocs || '');
      setCoreFunction('现有应用更新'); 
      setDescription(app.fullDescription);
      setFeatures(app.features);
      setPrice(app.price);
      setPricingModel(app.pricingModel);
      setActiveTab('publish');
      setStep(1);
      setActiveMenuId(null);
  };

  const handleDeleteClick = (app: AIApp) => {
      setAppToDelete(app);
      setIsDeleteModalOpen(true);
      setActiveMenuId(null);
  };

  const handleConfirmDelete = () => {
      if (appToDelete) {
          onDelete(appToDelete);
          setIsDeleteModalOpen(false);
          setAppToDelete(null);
      }
  };

  const handleAiAssist = async () => {
    if (!appName || !coreFunction) return;
    setIsGenerating(true);
    setAiTip('正在连接 Gemini...');
    
    const [descResult, suggestion] = await Promise.all([
        generateAppDescription(appName, coreFunction, "专业人士"),
        suggestPricing(appName, category)
    ]);
    
    setDescription(descResult.description);
    setFeatures(descResult.features);
    setAiTip(`AI 建议: ${suggestion}`);
    setIsGenerating(false);
  };

  const handleGithubDeploy = () => {
      if (!repoUrl) return;
      setBuildStatus('building');
      setBuildLogs(['> Initializing build environment...', '> Cloning repository...']);
      
      let step = 0;
      const steps = [
          '> Installing dependencies (npm install)...',
          '> Running build script (npm run build)...',
          '> Optimizing production assets...',
          '> Verifying security protocols...',
          '> Deploying to Nexus Cloud Edge...'
      ];

      const interval = setInterval(() => {
          if (step < steps.length) {
              setBuildLogs(prev => [...prev, steps[step]]);
              step++;
          } else {
              clearInterval(interval);
              const generatedUrl = `https://${appName.toLowerCase().replace(/\s+/g, '-')}.nexus-deploy.com`;
              setBuildLogs(prev => [...prev, `> Success! App deployed to: ${generatedUrl}`]);
              setDeploymentUrl(generatedUrl);
              setBuildStatus('success');
          }
      }, 800);
  };

  const handlePublishClick = () => {
      setIsConfirmOpen(true);
  };

  const handleConfirmPublish = () => {
    setIsConfirmOpen(false);
    const deployConfig: DeploymentConfig = {
        type: deploymentType,
        url: deploymentUrl,
        docsUrl: apiDocs || undefined,
        repoUrl: repoUrl || undefined
    };

    const currentApp = editingId ? myApps.find(a => a.id === editingId) : null;

    const appData: AIApp = {
      id: editingId || Date.now().toString(),
      title: appName,
      shortDescription: description.substring(0, 80) + '...',
      fullDescription: description,
      features: features,
      iconUrl: currentApp?.iconUrl || 'https://picsum.photos/100/100?random=' + Date.now(),
      coverImageUrl: currentApp?.coverImageUrl || 'https://picsum.photos/800/400?random=' + Date.now(),
      screenshots: currentApp?.screenshots || [],
      deployment: deployConfig,
      toolsUsed: currentApp?.toolsUsed || ['Gemini 2.5', 'React'],
      authorName: 'You', 
      rating: currentApp?.rating || 0,
      reviewCount: currentApp?.reviewCount || 0,
      reviews: currentApp?.reviews || [],
      downloads: currentApp?.downloads || 0,
      pricingModel,
      price,
      category,
      tags: ['新品', category],
      releaseDate: currentApp?.releaseDate || new Date().toISOString().split('T')[0],
      status: AppStatus.UNDER_REVIEW,
      currentVersion: currentApp ? (parseFloat(currentApp.currentVersion) + 0.1).toFixed(1) + '.0' : '1.0.0',
      versionHistory: currentApp?.versionHistory || [],
      helpDocs: helpDocs
    };

    onPublish(appData, !!editingId);
    resetForm();
    setActiveTab('my-apps');
  };

  const getStatusBadge = (status: AppStatus) => {
    switch (status) {
      case AppStatus.PUBLISHED:
        return <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded font-medium">已发布</span>;
      case AppStatus.UNDER_REVIEW:
        return <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-medium">审核中</span>;
      default:
        return <span className="text-xs text-gray-400 bg-gray-400/10 px-2 py-0.5 rounded font-medium">草稿</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onClick={() => setActiveMenuId(null)}>
      <ConfirmModal 
        isOpen={isConfirmOpen}
        title="确认提交发布"
        message={`您确定要提交 "${appName}" 进行平台审核吗？`}
        confirmText="确认提交"
        onConfirm={handleConfirmPublish}
        onCancel={() => setIsConfirmOpen(false)}
      />

      {appToDelete && (
        <DeleteConfirmModal 
          isOpen={isDeleteModalOpen}
          app={appToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="nexus-card p-2 sticky top-24">
            <nav className="space-y-1">
              {[
                  { id: 'overview', icon: TrendingUp, label: '数据概览' },
                  { id: 'my-apps', icon: Bot, label: '我的应用' },
                  { id: 'publish', icon: Upload, label: '发布应用' },
                  { id: 'payouts', icon: DollarSign, label: '财务报表' }
              ].map(item => (
                <button 
                    key={item.id}
                    onClick={() => {
                        if(item.id === 'publish') resetForm();
                        setActiveTab(item.id as any);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm font-medium flex items-center gap-2 rounded-md transition-colors ${
                        activeTab === item.id 
                        ? 'bg-nexus-green text-white' 
                        : 'text-nexus-sub hover:text-white hover:bg-nexus-base'
                    }`}
                >
                    <item.icon size={16} /> {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                     { label: '累计总收入', value: '¥ 32,544.00', color: 'text-nexus-green' },
                     { label: '活跃订阅数', value: '342', color: 'text-nexus-blue' },
                     { label: '总安装量', value: '12.5k', color: 'text-nexus-purple' }
                 ].map((stat, i) => (
                    <div key={i} className="nexus-card p-6">
                        <div className="text-nexus-sub text-xs uppercase font-bold mb-2">{stat.label}</div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                 ))}
              </div>
              
              <div className="nexus-card p-6">
                <h3 className="text-white font-bold mb-6">收入趋势分析</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_SALES_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="date" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                      <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tickFormatter={(val) => `¥${val}`}/>
                      <Tooltip 
                        contentStyle={{backgroundColor:'#1F2937', border:'1px solid #374151', color: '#fff'}}
                        itemStyle={{color: '#10B981'}}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#colorGradient)" fillOpacity={0.1} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'my-apps' && (
              <div className="nexus-card min-h-[500px]">
                  <div className="p-4 border-b border-nexus-input flex justify-between items-center">
                      <h3 className="font-bold text-white">应用列表</h3>
                      <button 
                        onClick={() => { resetForm(); setActiveTab('publish'); }}
                        className="nexus-btn-primary px-3 py-1.5 text-xs flex items-center gap-1"
                      >
                          <Plus size={14} /> 新建
                      </button>
                  </div>
                  
                  <div className="p-4 space-y-3">
                      {myApps.length === 0 ? (
                          <div className="text-center py-20 text-nexus-sub border border-dashed border-nexus-input rounded-lg">
                              <Bot size={40} className="mx-auto mb-2 opacity-50"/>
                              <p>暂无应用</p>
                          </div>
                      ) : (
                          myApps.map(app => (
                              <div key={app.id} className="bg-nexus-base border border-nexus-input p-4 rounded-lg flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                      <img src={app.iconUrl} className="w-12 h-12 rounded bg-black object-cover" alt="" />
                                      <div>
                                          <div className="font-bold text-white text-sm flex items-center gap-2">
                                              {app.title}
                                              {getStatusBadge(app.status)}
                                          </div>
                                          <div className="text-xs text-nexus-sub mt-0.5">v{app.currentVersion} • {app.category}</div>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-8">
                                      <div className="text-right hidden sm:block">
                                          <div className="text-xs text-nexus-sub">安装量</div>
                                          <div className="text-white font-medium">{app.downloads.toLocaleString()}</div>
                                      </div>
                                      {/* Restore Revenue Display */}
                                      <div className="text-right hidden sm:block">
                                          <div className="text-xs text-nexus-sub">预估收入</div>
                                          <div className="text-nexus-green font-medium">¥{(app.price * app.downloads).toLocaleString()}</div>
                                      </div>
                                      <div className="relative flex items-center gap-2">
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); onViewApp(app); }}
                                            className="px-3 py-1 text-xs text-nexus-green bg-nexus-green/10 rounded hover:bg-nexus-green/20"
                                          >
                                              预览
                                          </button>
                                          <button 
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  setActiveMenuId(activeMenuId === app.id ? null : app.id);
                                              }}
                                              className="p-1.5 hover:bg-nexus-card rounded text-nexus-sub hover:text-white"
                                          >
                                              <Edit3 size={16} />
                                          </button>
                                          
                                          {activeMenuId === app.id && (
                                              <div className="absolute right-0 top-full mt-2 w-32 bg-nexus-card border border-nexus-input shadow-lg rounded-md z-20 overflow-hidden">
                                                  <button 
                                                      onClick={(e) => { e.stopPropagation(); handleEditApp(app); }}
                                                      className="w-full text-left px-3 py-2 text-xs text-nexus-sub hover:bg-nexus-base hover:text-white"
                                                  >
                                                      编辑信息
                                                  </button>
                                                  <button 
                                                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(app); }}
                                                      className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-nexus-base"
                                                  >
                                                      删除应用
                                                  </button>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          ))
                      )}
                  </div>
              </div>
          )}

          {activeTab === 'publish' && (
            <div className="nexus-card p-8 relative">
              {/* Simple Step Indicator */}
              <div className="flex items-center justify-between mb-8 text-sm border-b border-nexus-input pb-4">
                 {[1, 2, 3, 4].map(s => (
                     <div key={s} className={`flex items-center gap-2 ${step >= s ? 'text-nexus-green' : 'text-nexus-sub'}`}>
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step >= s ? 'border-nexus-green bg-nexus-green/10' : 'border-nexus-input'}`}>
                             {step > s ? <CheckCircle size={14}/> : s}
                         </div>
                         <span className="hidden sm:inline">{s === 1 ? '基础' : s === 2 ? '部署' : s === 3 ? '营销' : '定价'}</span>
                     </div>
                 ))}
              </div>

              {step === 1 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                        <div>
                            <label className="block text-xs font-bold text-nexus-sub mb-1.5">应用名称</label>
                            <input 
                                type="text" 
                                value={appName}
                                onChange={(e) => setAppName(e.target.value)}
                                className="nexus-input w-full p-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-nexus-sub mb-1.5">所属分类</label>
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="nexus-select w-full p-2 text-sm"
                            >
                                <option>生产力</option>
                                <option>开发工具</option>
                                <option>设计创意</option>
                                <option>写作辅助</option>
                                <option>数据分析</option>
                            </select>
                        </div>
                      <div className="pt-6 flex justify-end">
                          <button onClick={nextStep} disabled={!appName} className="nexus-btn-primary px-6 py-2 text-sm">
                              下一步
                          </button>
                      </div>
                  </div>
              )}

              {step === 2 && (
                  <div className="space-y-6 max-w-xl mx-auto">
                       <div className="grid grid-cols-2 gap-3 mb-6">
                           {[
                               { id: DeploymentType.WEB_APP, icon: Globe, label: 'WEB 应用' },
                               { id: DeploymentType.GRADIO, icon: Code, label: 'GRADIO' },
                               { id: DeploymentType.API, icon: Server, label: 'API 服务' },
                               { id: DeploymentType.INTERNAL, icon: Bot, label: '内部沙盒' }
                           ].map((type) => (
                               <div 
                                key={type.id} 
                                onClick={() => setDeploymentType(type.id)}
                                className={`p-3 border rounded-lg cursor-pointer flex items-center gap-3 ${deploymentType === type.id ? 'bg-nexus-green/10 border-nexus-green text-white' : 'border-nexus-input text-nexus-sub hover:bg-nexus-base'}`}
                               >
                                   <type.icon size={18} />
                                   <span className="text-sm font-medium">{type.label}</span>
                               </div>
                           ))}
                       </div>

                       <div className="border-t border-nexus-input pt-6">
                          <label className="block text-xs font-bold text-nexus-sub mb-3">部署源</label>
                          <div className="flex bg-nexus-base p-1 rounded-lg border border-nexus-input mb-4">
                              <button 
                                onClick={() => setDeploySource('url')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors ${deploySource === 'url' ? 'bg-nexus-card text-white shadow-sm' : 'text-nexus-sub hover:text-white'}`}
                              >
                                  <LinkIcon size={14} /> 手动输入 URL
                              </button>
                              <button 
                                onClick={() => setDeploySource('github')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors ${deploySource === 'github' ? 'bg-nexus-card text-white shadow-sm' : 'text-nexus-sub hover:text-white'}`}
                              >
                                  <Github size={14} /> GitHub 仓库部署
                              </button>
                          </div>

                          {deploySource === 'url' ? (
                               <div>
                                    <label className="block text-xs font-bold text-nexus-sub mb-1.5">目标 URL</label>
                                    <input 
                                        type="text" 
                                        value={deploymentUrl}
                                        onChange={(e) => setDeploymentUrl(e.target.value)}
                                        className="nexus-input w-full p-2 text-sm font-mono"
                                        placeholder="https://your-app-domain.com"
                                    />
                               </div>
                          ) : (
                              <div className="space-y-4">
                                   <div>
                                       <label className="block text-xs font-bold text-nexus-sub mb-1.5">GitHub 仓库地址</label>
                                       <div className="flex gap-2">
                                           <input 
                                                type="text" 
                                                value={repoUrl}
                                                onChange={(e) => setRepoUrl(e.target.value)}
                                                className="nexus-input flex-1 p-2 text-sm font-mono"
                                                placeholder="https://github.com/username/repo"
                                           />
                                           <button 
                                            onClick={handleGithubDeploy}
                                            disabled={!repoUrl || buildStatus === 'building' || buildStatus === 'success'}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${buildStatus === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'nexus-btn-primary'}`}
                                           >
                                               {buildStatus === 'building' ? <Loader2 className="animate-spin" size={16} /> : buildStatus === 'success' ? <CheckCircle size={16} /> : <Terminal size={16} />}
                                               {buildStatus === 'building' ? '构建中...' : buildStatus === 'success' ? '已部署' : '开始部署'}
                                           </button>
                                       </div>
                                   </div>

                                   {(buildStatus === 'building' || buildStatus === 'success') && (
                                       <div className="bg-black border border-nexus-input rounded-lg p-3 font-mono text-xs h-40 overflow-y-auto">
                                           {buildLogs.map((log, i) => (
                                               <div key={i} className={`${(log || '').includes('Error') ? 'text-red-400' : (log || '').includes('Success') ? 'text-green-400 font-bold' : 'text-gray-400'}`}>
                                                   {log}
                                               </div>
                                           ))}
                                           <div ref={logsEndRef} />
                                       </div>
                                   )}
                                   
                                   {buildStatus === 'success' && (
                                       <div className="animate-fade-in">
                                            <label className="block text-xs font-bold text-nexus-sub mb-1.5">生成的目标 URL</label>
                                            <input 
                                                type="text" 
                                                value={deploymentUrl}
                                                readOnly
                                                className="nexus-input w-full p-2 text-sm font-mono text-green-400 bg-green-400/5 border-green-400/20"
                                            />
                                       </div>
                                   )}
                              </div>
                          )}
                       </div>
                            
                       <div className="pt-4">
                            <label className="block text-xs font-bold text-nexus-sub mb-1.5">使用文档 (Markdown)</label>
                            <textarea 
                                value={helpDocs}
                                onChange={(e) => setHelpDocs(e.target.value)}
                                className="nexus-input w-full p-2 text-sm font-mono h-32"
                                placeholder="# 使用指南..."
                            />
                       </div>

                       <div className="pt-6 flex justify-between">
                          <button onClick={prevStep} className="px-4 py-2 text-sm text-nexus-sub hover:text-white">返回</button>
                          <button onClick={nextStep} disabled={!deploymentUrl} className="nexus-btn-primary px-6 py-2 text-sm">下一步</button>
                      </div>
                  </div>
              )}

              {step === 3 && (
                   <div className="space-y-6 max-w-xl mx-auto">
                       <div className="flex justify-between items-center">
                           <h3 className="font-bold text-white">AI 营销助手</h3>
                           <button 
                            onClick={handleAiAssist}
                            disabled={isGenerating || !coreFunction}
                            className="text-xs text-nexus-green hover:underline flex items-center gap-1"
                           >
                               <Bot size={14}/> {isGenerating ? '生成中...' : '自动生成'}
                           </button>
                       </div>
                       <div>
                            <label className="block text-xs font-bold text-nexus-sub mb-1.5">核心功能描述</label>
                            <textarea 
                                value={coreFunction}
                                onChange={(e) => setCoreFunction(e.target.value)}
                                className="nexus-input w-full p-2 h-20 text-sm"
                            />
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-nexus-sub mb-1.5">营销文案</label>
                           <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="nexus-input w-full p-2 h-32 text-sm"
                           />
                           {aiTip && <div className="mt-2 text-xs text-nexus-green">{aiTip}</div>}
                       </div>
                        <div className="pt-6 flex justify-between">
                          <button onClick={prevStep} className="px-4 py-2 text-sm text-nexus-sub hover:text-white">返回</button>
                          <button onClick={nextStep} disabled={!description} className="nexus-btn-primary px-6 py-2 text-sm">下一步</button>
                        </div>
                   </div>
              )}

              {step === 4 && (
                   <div className="space-y-6 max-w-xl mx-auto">
                       <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-nexus-sub mb-1.5">收费模式</label>
                                <select 
                                value={pricingModel}
                                onChange={(e) => setPricingModel(e.target.value as PricingModel)}
                                className="nexus-select w-full p-2 text-sm"
                                >
                                {Object.values(PricingModel).map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            {pricingModel !== PricingModel.FREE && (
                            <div>
                                <label className="block text-xs font-bold text-nexus-sub mb-1.5">价格 (CNY)</label>
                                <input 
                                    type="number" 
                                    min="0.99"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    className="nexus-input w-full p-2 text-sm"
                                />
                            </div>
                            )}
                       </div>

                       <div className="pt-8 flex justify-between">
                          <button onClick={prevStep} className="px-4 py-2 text-sm text-nexus-sub hover:text-white">返回</button>
                          <button onClick={handlePublishClick} className="nexus-btn-primary px-8 py-2 text-sm">
                              {editingId ? '更新应用' : '确认发布'}
                          </button>
                        </div>
                   </div>
              )}
            </div>
          )}
          
          {activeTab === 'payouts' && (
             <div className="nexus-card overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-nexus-base text-nexus-sub border-b border-nexus-input">
                    <tr>
                      <th className="px-6 py-3 font-medium">结算周期</th>
                      <th className="px-6 py-3 font-medium">总收入</th>
                      <th className="px-6 py-3 font-medium">净收益</th>
                      <th className="px-6 py-3 font-medium">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-nexus-input">
                    {MOCK_PAYOUTS.map(payout => (
                      <tr key={payout.id}>
                        <td className="px-6 py-4 text-white">{payout.year}年 {payout.month}</td>
                        <td className="px-6 py-4 text-nexus-sub">¥{payout.grossRevenue.toFixed(2)}</td>
                        <td className="px-6 py-4 text-nexus-green font-medium">¥{payout.netPayout.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 text-xs rounded font-medium ${payout.status === '已打款' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {payout.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
