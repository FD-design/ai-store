
import React, { useState } from 'react';
import { AIApp, PricingModel, DeploymentType } from '../types';
import { 
  ArrowLeft, ArrowRight, Share2, Play, Star, Download, 
  Terminal, Cpu, Zap, ShieldCheck, Lock, BookOpen
} from 'lucide-react';

interface AppLandingPageProps {
  app: AIApp;
  isStandalone: boolean;
  isOwned?: boolean;
  trialRemaining?: number;
  onBack: () => void;
  onSubscribe: (app: AIApp) => void;
  onLaunch?: (app: AIApp) => void;
  onShare: () => void;
  onViewDocs?: (app: AIApp) => void;
}

const AppLandingPage: React.FC<AppLandingPageProps> = ({
  app,
  isStandalone,
  isOwned = false,
  trialRemaining = 3,
  onBack,
  onSubscribe,
  onLaunch,
  onShare,
  onViewDocs
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'docs'>('overview');
  
  // Logic to determine if trial button should be shown
  const canTrial = !isOwned && (app.deployment.type === DeploymentType.INTERNAL || app.deployment.type === DeploymentType.WEB_APP);

  return (
    <div className={`min-h-screen pb-20 animate-fade-in bg-nexus-base ${isStandalone ? 'pt-0' : ''}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Nav Back */}
        {!isStandalone && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-nexus-sub hover:text-white mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>返回列表</span>
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-nexus-input">
               <img src={app.iconUrl} className="w-24 h-24 rounded-2xl bg-black border border-nexus-input shadow-lg" alt="logo" />

               <div className="flex-1 pt-1">
                  <h1 className="text-4xl font-bold text-white mb-2">{app.title}</h1>
                  <p className="text-nexus-sub text-lg mb-4">{app.shortDescription}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="px-2 py-0.5 rounded bg-nexus-card border border-nexus-input text-nexus-sub font-medium">
                        {app.category}
                    </span>
                    <span className="flex items-center gap-1 text-white font-medium">
                        <Star size={14} className="text-yellow-400" fill="currentColor" /> {app.rating}
                        {/* RESTORED REVIEW COUNT */}
                        <span className="text-nexus-sub text-xs">({app.reviewCount})</span>
                    </span>
                    <span className="flex items-center gap-1 text-nexus-sub">
                        <Download size={14} /> {app.downloads.toLocaleString()} 下载
                    </span>
                  </div>
               </div>
            </div>

            {/* Media Gallery */}
            <div className="overflow-x-auto flex gap-4 snap-x pb-2">
                {app.videoUrl && (
                    <div className="flex-shrink-0 w-[400px] aspect-video bg-black rounded-lg relative flex items-center justify-center border border-nexus-input">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                             <Play fill="white" className="ml-1 text-white" />
                        </div>
                        <span className="absolute bottom-2 right-2 text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded">Preview</span>
                    </div>
                )}
                {app.screenshots.map((shot, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[400px] aspect-video bg-black rounded-lg overflow-hidden border border-nexus-input">
                        <img src={shot} className="w-full h-full object-cover" alt={`screenshot ${idx}`} />
                    </div>
                ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-nexus-input gap-8">
                {[
                    { id: 'overview', label: '概览' },
                    { id: 'reviews', label: `评价 (${app.reviewCount})` },
                    { id: 'docs', label: '使用指南' }
                ].map((tab) => {
                    if (tab.id === 'docs' && !app.helpDocs) return null;
                    const isActive = activeTab === tab.id;
                    return (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                                isActive 
                                ? 'text-white border-nexus-green' 
                                : 'text-nexus-sub border-transparent hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="space-y-8">
                     
                     {/* Try It Section */}
                     {canTrial && (
                        <div className="bg-nexus-card border border-nexus-input rounded-xl p-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-nexus-base rounded-lg text-nexus-green">
                                    <Terminal size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">沙盒运行模式</h3>
                                    <p className="text-sm text-nexus-sub">无需安装，云端容器立即体验。</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => onLaunch && onLaunch(app)}
                                disabled={trialRemaining <= 0}
                                className={`px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors border ${
                                    trialRemaining > 0 
                                    ? 'bg-transparent border-white/20 text-white hover:border-white hover:bg-white/5' // White/Transparent style for trial
                                    : 'bg-nexus-input border-transparent text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {trialRemaining > 0 ? (
                                    <>
                                        <Play size={16} fill="currentColor"/> 
                                        立即试用 (余 {trialRemaining} 次)
                                    </>
                                ) : (
                                    <>
                                        <Lock size={16} /> 
                                        试用已结束
                                    </>
                                )}
                            </button>
                        </div>
                     )}

                     {/* Description */}
                     <div>
                        <h2 className="text-lg font-bold text-white mb-4">关于应用</h2>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{app.fullDescription}</p>
                     </div>

                     {/* Features */}
                     <div>
                         <h2 className="text-lg font-bold text-white mb-4">核心功能</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {app.features.map((feature, idx) => (
                                <div key={idx} className="bg-nexus-card border border-nexus-input p-4 rounded-lg flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 bg-nexus-green rounded-full"></div>
                                    <p className="text-gray-300 text-sm font-medium">{feature}</p>
                                </div>
                            ))}
                         </div>
                     </div>

                     {/* Tech Stack */}
                     <div className="border-t border-nexus-input pt-6">
                        <h3 className="text-xs font-bold text-nexus-sub uppercase tracking-wider mb-3">技术架构</h3>
                        <div className="flex flex-wrap gap-2">
                            {app.toolsUsed.map((tool, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-nexus-card border border-nexus-input rounded text-xs text-nexus-sub">
                                    <Cpu size={14} className="text-nexus-sub" />
                                    {tool}
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white">用户反馈 ({app.reviewCount})</h2>
                        <select className="nexus-select text-sm py-1.5 w-40">
                            <option>最新评价</option>
                            <option>评分最高</option>
                        </select>
                    </div>

                    <div className="grid gap-4">
                        {app.reviews.map((review) => (
                            <div key={review.id} className="border border-nexus-input p-5 rounded-xl bg-nexus-card">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <img src={review.avatarUrl} className="w-8 h-8 rounded-full bg-nexus-base" alt="avatar" />
                                        <div>
                                            <div className="font-bold text-white text-sm">{review.userName}</div>
                                            <div className="text-xs text-nexus-sub">{review.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-600"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {activeTab === 'docs' && app.helpDocs && (
                <div className="py-12 text-center border border-dashed border-nexus-input rounded-xl bg-nexus-card/50">
                    <BookOpen size={40} className="text-nexus-sub mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">开发者文档</h3>
                    <p className="text-nexus-sub mb-6 text-sm">查看详细的集成指南和 API 参考手册</p>
                    <button 
                        onClick={() => onViewDocs && onViewDocs(app)}
                        className="px-6 py-2 bg-nexus-card hover:bg-nexus-input border border-nexus-input rounded-lg text-white font-medium text-sm transition-colors"
                    >
                        打开阅读器
                    </button>
                </div>
            )}

          </div>

          {/* Right Column: Sticky Action Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
                <div className="nexus-card p-6 border border-nexus-input shadow-lg">
                    <div className="mb-6 pb-6 border-b border-nexus-input">
                        <div className="text-xs font-bold text-nexus-sub mb-1 uppercase tracking-wider">授权价格</div>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-3xl font-bold text-white">
                                {app.price === 0 ? '免费' : `¥${app.price}`}
                            </span>
                            {app.pricingModel === PricingModel.SUBSCRIPTION && <span className="text-nexus-sub text-sm mb-1">/月</span>}
                        </div>
                        <div className={`inline-block px-2 py-0.5 text-xs font-bold rounded border ${
                            app.pricingModel === PricingModel.FREE 
                            ? 'bg-nexus-base border-nexus-input text-nexus-sub' 
                            : 'bg-nexus-purple/10 border-nexus-purple/20 text-nexus-purple'
                        }`}>
                            {app.pricingModel === PricingModel.FREE ? '开源协议' : '商业授权'}
                        </div>
                    </div>

                    <button 
                        onClick={isOwned ? () => onLaunch && onLaunch(app) : () => onSubscribe(app)}
                        className={`w-full py-3 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors ${
                            isOwned 
                            ? 'bg-nexus-card border border-nexus-green text-nexus-green hover:bg-nexus-green/10' 
                            : 'nexus-btn-primary hover:bg-emerald-600 shadow-lg shadow-emerald-900/20'
                        }`}
                    >
                        {isOwned ? (
                            <>启动应用 <Play size={18} fill="currentColor" /></>
                        ) : (
                            <>
                                {app.price === 0 ? '免费获取' : '立即购买'} 
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <div className="mt-4 space-y-3 pt-2 text-xs text-nexus-sub">
                        <div className="flex items-start gap-2">
                            <Zap size={14} className="text-yellow-500 shrink-0" fill="currentColor" />
                            <span>支付后即时自动交付</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <ShieldCheck size={14} className="text-nexus-green shrink-0" />
                            <span>7天无理由退款保障</span>
                        </div>
                    </div>
                </div>

                <div 
                    onClick={onShare}
                    className="border border-nexus-input p-4 rounded-lg flex items-center justify-between hover:bg-nexus-card transition-colors cursor-pointer"
                >
                    <span className="text-sm text-nexus-sub">推荐返佣计划</span>
                    <button className="text-sm text-nexus-blue flex items-center gap-1 font-medium">
                        <Share2 size={14} /> 获取链接
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLandingPage;
