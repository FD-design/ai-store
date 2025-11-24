import React, { useState } from 'react';
import { AIApp, PricingModel } from '../types';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Star, Award, Zap, Cpu, Activity, Share2, Play, Terminal, Image as ImageIcon, MessageSquare } from 'lucide-react';

interface AppDetailProps {
  app: AIApp;
  onBack: () => void;
  onSubscribe: (app: AIApp) => void;
}

const AppDetail: React.FC<AppDetailProps> = ({ app, onBack, onSubscribe }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen pb-20 animate-fade-in relative">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-nexus-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-nexus-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* Nav Back */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group py-2 px-4 rounded-full bg-black/20 backdrop-blur-md border border-white/5 w-fit hover:border-nexus-primary/50"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          返回市场
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Info */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
               <img src={app.iconUrl} className="w-32 h-32 rounded-[2rem] border border-white/10 shadow-2xl shadow-nexus-primary/10 bg-black" alt="logo" />
               <div className="flex-1 pt-2">
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">{app.title}</h1>
                  <p className="text-gray-400 text-lg mb-4">{app.shortDescription}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
                        {app.category}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                        <Star size={16} fill="currentColor" /> {app.rating} <span className="text-gray-600 font-normal">({app.reviewCount} 评价)</span>
                    </span>
                    <span className="flex items-center gap-1 text-nexus-secondary text-sm">
                        <Award size={16} /> 
                        <span className="text-white hover:underline cursor-pointer">{app.authorName}</span>
                    </span>
                  </div>
               </div>
            </div>

            {/* Media Gallery (Carousel Mock) */}
            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 flex gap-4 snap-x">
                {app.videoUrl && (
                    <div className="flex-shrink-0 w-80 md:w-[480px] h-48 md:h-72 rounded-2xl bg-black border border-white/10 relative overflow-hidden group cursor-pointer snap-center">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                <Play fill="white" className="ml-1 text-white" />
                            </div>
                        </div>
                        <img src={app.coverImageUrl || app.screenshots[0]} className="w-full h-full object-cover opacity-60" alt="video thumb" />
                        <div className="absolute bottom-4 left-4 text-xs font-bold text-white bg-black/60 px-2 py-1 rounded">视频预览</div>
                    </div>
                )}
                {app.screenshots.map((shot, idx) => (
                    <div key={idx} className="flex-shrink-0 w-80 md:w-[480px] h-48 md:h-72 rounded-2xl bg-black border border-white/10 overflow-hidden snap-center relative">
                        <img src={shot} className="w-full h-full object-cover" alt={`screenshot ${idx}`} />
                    </div>
                ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/10">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 px-6 text-sm font-bold transition-all border-b-2 ${activeTab === 'overview' ? 'border-nexus-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    概览
                </button>
                <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-4 px-6 text-sm font-bold transition-all border-b-2 ${activeTab === 'reviews' ? 'border-nexus-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    评价 ({app.reviewCount})
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' ? (
                <div className="space-y-8 animate-fade-in">
                     {/* Try It Section */}
                    <div className="bg-gradient-to-r from-nexus-primary/10 to-nexus-secondary/10 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-xl text-nexus-secondary"><Terminal size={24} /></div>
                            <div>
                                <h3 className="font-bold text-white">在线试用</h3>
                                <p className="text-sm text-gray-400">无需安装，在浏览器沙盒中立即体验核心功能。</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowDemo(!showDemo)}
                            className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                        >
                            {showDemo ? '关闭演示' : '开始运行'}
                        </button>
                    </div>

                    {showDemo && (
                        <div className="bg-black border border-white/20 rounded-xl h-64 font-mono text-sm p-4 overflow-y-auto text-green-400 shadow-inner">
                            <p>> Initializing {app.title} environment...</p>
                            <p>> Connecting to decentralized node...</p>
                            <p>> Verified license: Trial Mode</p>
                            <p className="animate-pulse">> _ Waiting for user input...</p>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">关于此应用</h2>
                        <p className="text-gray-300 leading-8 whitespace-pre-wrap font-light text-lg">
                            {app.fullDescription}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Cpu size={20} className="text-nexus-primary" /> 构建技术栈
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {app.toolsUsed.map((tool, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-gray-300 shadow-sm">
                                    <Zap size={12} className="text-yellow-400" fill="currentColor" />
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">用户反馈</h2>
                        <select className="bg-black border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-1">
                            <option>最新评价</option>
                            <option>最有帮助</option>
                            <option>评分最高</option>
                        </select>
                    </div>

                    <div className="grid gap-4">
                        {app.reviews.map((review) => (
                            <div key={review.id} className="bg-white/5 border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img src={review.avatarUrl} className="w-10 h-10 rounded-full bg-white/10" alt="avatar" />
                                        <div>
                                            <div className="font-bold text-white text-sm">{review.userName}</div>
                                            <div className="text-xs text-gray-500">{review.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-700" : ""} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

          </div>

          {/* Right Column: Checkout (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
                <div className="bg-[#0f172a] rounded-3xl p-1 border border-white/10 shadow-2xl">
                    <div className="bg-[#020420] rounded-[22px] p-6 relative overflow-hidden">
                        
                        <div className="text-center mb-6">
                            <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Pricing</div>
                            <div className="flex items-center justify-center gap-1">
                                <span className="text-4xl font-black text-white">
                                    {app.price === 0 ? '免费' : `¥${app.price}`}
                                </span>
                                {app.pricingModel === PricingModel.SUBSCRIPTION && <span className="text-gray-400 text-sm">/月</span>}
                            </div>
                            <div className="mt-2 inline-flex px-3 py-1 rounded-full bg-nexus-primary/10 text-nexus-primary text-xs font-bold border border-nexus-primary/20">
                                {app.pricingModel}
                            </div>
                        </div>

                        <button 
                            onClick={() => onSubscribe(app)}
                            className="w-full py-4 rounded-xl bg-nexus-primary hover:bg-nexus-primary/80 text-white font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                        >
                            {app.price === 0 ? '获取应用' : '立即支付'}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="mt-6 space-y-4 border-t border-white/5 pt-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" />
                                <div className="text-sm text-gray-400">
                                    <strong className="text-white block mb-0.5">即时交付</strong>
                                    支付成功后立即获得 API Key 或下载链接。
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck size={16} className="text-green-400 mt-0.5 shrink-0" />
                                <div className="text-sm text-gray-400">
                                    <strong className="text-white block mb-0.5">区块链存证</strong>
                                    每一笔交易都在链上可查，永久拥有使用权。
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5">
                            <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-400 transition-colors flex items-center justify-center gap-2">
                                <Share2 size={14} /> 分享此应用赚取佣金
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetail;