import React, { useState, useEffect } from 'react';
import { AIApp } from '../types';
import { ShieldCheck, Upload, FileText, ArrowLeft, Bot, Lock, AlertTriangle, CheckCircle, Search, Activity } from 'lucide-react';

interface AppRuntimeProps {
  app: AIApp;
  onExit: () => void;
  isTrial?: boolean;
  trialRemaining?: number;
}

const AppRuntime: React.FC<AppRuntimeProps> = ({ app, onExit, isTrial = false, trialRemaining = 0 }) => {
  const [step, setStep] = useState<'upload' | 'scanning' | 'analyzing' | 'report'>('upload');
  const [progress, setProgress] = useState(0);

  // Block access if trial expired
  if (isTrial && trialRemaining <= 0) {
      return (
          <div className="min-h-screen bg-nexus-base flex items-center justify-center font-sans">
              <div className="text-center p-8 max-w-md bg-nexus-card border border-nexus-input rounded-xl shadow-2xl">
                  <div className="w-16 h-16 bg-nexus-base rounded-full flex items-center justify-center mx-auto mb-4 border border-nexus-input">
                    <Lock size={32} className="text-nexus-sub" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">试用次数已耗尽</h2>
                  <p className="text-nexus-sub mb-6">您已完成所有免费试用。请订阅以解锁完整功能。</p>
                  <button onClick={onExit} className="nexus-btn-primary px-6 py-2 w-full">返回详情页</button>
              </div>
          </div>
      );
  }

  // LegalEagle Specific Demo Logic
  if (app.id === '3') {
    const startAnalysis = () => {
        setStep('scanning');
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setStep('analyzing');
                setTimeout(() => setStep('report'), 2000);
            }
        }, 50);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans text-slate-200">
            {/* Header */}
            <div className="h-16 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onExit} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <ShieldCheck size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-white text-lg tracking-tight">LegalEagle <span className="text-blue-400 font-normal text-sm ml-1">Pro</span></span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isTrial && (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                            <Activity size={12} /> 试用模式 (余 {trialRemaining} 次)
                        </div>
                    )}
                    <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-[#1e293b] border-r border-slate-700 hidden md:flex flex-col">
                    <div className="p-4 space-y-1">
                        <div className="px-3 py-2 bg-blue-600/10 text-blue-400 rounded-lg text-sm font-medium flex items-center gap-2">
                            <FileText size={16}/> 当前任务
                        </div>
                        <div className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer transition-colors">
                            <Bot size={16}/> 历史记录
                        </div>
                    </div>
                </div>

                {/* Workspace */}
                <div className="flex-1 bg-[#0f172a] p-8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    
                    {step === 'upload' && (
                        <div className="relative z-10 w-full max-w-2xl">
                            <div className="border-2 border-dashed border-slate-600 hover:border-blue-500 bg-slate-800/50 rounded-2xl p-12 text-center transition-all cursor-pointer group hover:bg-slate-800" onClick={startAnalysis}>
                                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                    <Upload size={32} className="text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">上传合同文件</h2>
                                <p className="text-slate-400 mb-8">支持 PDF, DOCX, PNG (OCR 自动识别)</p>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/30 transition-all">
                                    选择文件
                                </button>
                                <p className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-1">
                                    <ShieldCheck size={12}/> 文件仅在本地沙箱处理，分析后立即销毁
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 'scanning' && (
                        <div className="relative z-10 w-full max-w-md text-center">
                            <div className="mb-8 relative w-24 h-32 mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
                                <div className="absolute top-4 left-4 right-4 h-2 bg-slate-200 rounded"></div>
                                <div className="absolute top-8 left-4 right-8 h-2 bg-slate-200 rounded"></div>
                                <div className="absolute top-12 left-4 right-6 h-2 bg-slate-200 rounded"></div>
                                {/* Scanning line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] animate-[scan_2s_infinite_linear]"></div>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-4">正在进行 OCR 识别...</h2>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-75 ease-linear" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="text-slate-400 text-sm mt-2">{progress}% 完成</p>
                        </div>
                    )}

                    {step === 'analyzing' && (
                        <div className="relative z-10 text-center">
                             <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
                             <h2 className="text-xl font-bold text-white mb-2">AI 正在分析法律风险...</h2>
                             <div className="flex flex-col gap-2 mt-4 text-sm text-slate-400 items-start max-w-xs mx-auto">
                                 <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> 正在检查免责条款...</div>
                                 <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> 正在比对当地法律法规...</div>
                                 <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> 正在生成修改建议...</div>
                             </div>
                        </div>
                    )}

                    {step === 'report' && (
                        <div className="relative z-10 w-full max-w-4xl h-[80vh] bg-[#1e293b] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
                             {/* Report Sidebar */}
                             <div className="w-full md:w-1/3 bg-slate-800 p-6 border-r border-slate-700 overflow-y-auto">
                                 <div className="mb-6">
                                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">总体风险评分</div>
                                     <div className="text-5xl font-black text-amber-500 mb-1">72<span className="text-lg text-slate-500 font-medium">/100</span></div>
                                     <div className="text-sm font-medium text-amber-400 bg-amber-400/10 inline-block px-2 py-1 rounded">中度风险</div>
                                 </div>
                                 
                                 <div className="space-y-4">
                                     <h3 className="text-sm font-bold text-white">检测到的风险点 (3)</h3>
                                     {[
                                         { title: '自动续约条款', severity: 'high', desc: '第 3.2 条包含静默续约风险。' },
                                         { title: '管辖法院', severity: 'medium', desc: '约定法院为异地法院，增加诉讼成本。' },
                                         { title: '违约金比例', severity: 'medium', desc: '违约金 30% 高于一般司法解释上限。' }
                                     ].map((risk, i) => (
                                         <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-700 hover:border-slate-500 cursor-pointer transition-colors">
                                             <div className="flex items-center justify-between mb-1">
                                                 <span className="font-bold text-slate-200 text-sm">{risk.title}</span>
                                                 <span className={`w-2 h-2 rounded-full ${risk.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                                             </div>
                                             <p className="text-xs text-slate-400">{risk.desc}</p>
                                         </div>
                                     ))}
                                 </div>
                             </div>

                             {/* Document Preview */}
                             <div className="flex-1 p-8 bg-white text-slate-800 overflow-y-auto font-serif relative">
                                 <div className="absolute top-4 right-4 text-xs font-sans text-slate-400">Contract_Scan_v1.pdf</div>
                                 <h1 className="text-2xl font-bold mb-6 text-center">服务租赁协议</h1>
                                 <p className="mb-4 text-sm leading-relaxed">
                                     甲方（出租方）：未来科技有限公司<br/>
                                     乙方（承租方）：张三
                                 </p>
                                 <p className="mb-4 text-sm leading-relaxed">
                                     第一条：租赁标的...
                                 </p>
                                 <p className="mb-4 text-sm leading-relaxed bg-red-100 border-l-4 border-red-500 pl-2 py-1">
                                     第三条：租赁期限届满前30日，若乙方未书面提出异议，本合同自动续期一年。
                                     <span className="block text-xs text-red-600 font-bold mt-1 font-sans">风险提示：建议修改为“双方协商一致后续期”。</span>
                                 </p>
                                 <p className="mb-4 text-sm leading-relaxed">
                                     第四条：违约责任...
                                 </p>
                                 <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between">
                                     <div className="h-12 w-32 border-b border-slate-900"></div>
                                     <div className="h-12 w-32 border-b border-slate-900"></div>
                                 </div>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  // Generic Demo Runtime for other apps
  return (
    <div className="min-h-screen bg-nexus-base flex flex-col font-sans">
        {/* Toolbar */}
        <div className="bg-nexus-card border-b border-nexus-input h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
             <button onClick={onExit} className="p-2 text-nexus-sub hover:text-white"><ArrowLeft size={18} /></button>
             <div className="flex items-center gap-2">
                 <img src={app.iconUrl} className="w-6 h-6 rounded" alt="" />
                 <span className="font-bold text-white text-sm">{app.title}</span>
             </div>
          </div>
          <div className="text-xs text-nexus-green flex items-center gap-1">
              <ShieldCheck size={12} /> 安全环境 (通用模式)
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
                <div className="w-20 h-20 bg-nexus-card rounded-2xl flex items-center justify-center mx-auto mb-6 border border-nexus-input">
                        <Upload size={32} className="text-nexus-sub" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">运行环境就绪</h2>
                <p className="text-nexus-sub mb-6">这是一个通用的应用运行容器演示。</p>
                <div className="flex justify-center gap-3">
                    <button onClick={onExit} className="px-6 py-2 border border-nexus-input rounded text-white hover:bg-nexus-card">
                        结束运行
                    </button>
                    <button className="nexus-btn-primary px-6 py-2">
                        执行任务
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AppRuntime;