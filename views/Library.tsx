import React, { useState } from 'react';
import { AIApp, PricingModel } from '../types';
import { Play, MoreVertical, Clock, FileText, Trash2, Box, HardDrive, BookOpen } from 'lucide-react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

interface LibraryProps {
  purchasedApps: AIApp[];
  onOpenApp: (app: AIApp) => void;
  onSelectApp?: (app: AIApp) => void;
  onViewDocs?: (app: AIApp) => void;
  onRemoveApp?: (app: AIApp) => void; 
}

const Library: React.FC<LibraryProps> = ({ purchasedApps, onOpenApp, onSelectApp, onViewDocs, onRemoveApp }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [appToRemove, setAppToRemove] = useState<AIApp | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleRemoveClick = (app: AIApp) => {
      setAppToRemove(app);
      setIsRemoveModalOpen(true);
      setActiveMenuId(null);
  };

  const handleConfirmRemove = () => {
      if (appToRemove && onRemoveApp) {
          onRemoveApp(appToRemove);
          setAppToRemove(null);
          setIsRemoveModalOpen(false);
      }
  };

  if (purchasedApps.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-16 h-16 bg-nexus-card rounded-full flex items-center justify-center mx-auto mb-4 text-nexus-sub">
           <Box size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">资产库为空</h2>
        <p className="text-nexus-sub mb-6">您还没有购买或订阅任何应用。</p>
        <button className="nexus-btn-primary px-6 py-2">前往市场</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" onClick={() => setActiveMenuId(null)}>
      
      {appToRemove && (
        <DeleteConfirmModal 
            isOpen={isRemoveModalOpen}
            onClose={() => setIsRemoveModalOpen(false)}
            onConfirm={handleConfirmRemove}
            app={appToRemove}
            mode="REMOVE_FROM_LIBRARY"
        />
      )}

      <div className="flex items-end justify-between mb-8 pb-4 border-b border-nexus-input">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                <HardDrive className="text-nexus-green" size={24} /> 我的资产库
            </h1>
          </div>
          <div className="hidden md:flex gap-3">
              <select className="nexus-select text-sm py-1.5">
                  <option>排序: 获取时间</option>
                  <option>排序: 应用名称</option>
              </select>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedApps.map(app => (
          <div key={app.id} className="nexus-card flex flex-col h-full relative group hover:border-nexus-green/50 transition-colors">
            
            {/* Header Image */}
            <div 
                className="h-32 bg-nexus-base relative overflow-hidden cursor-pointer rounded-t-lg"
                onClick={() => onSelectApp && onSelectApp(app)}
            >
                <img src={app.coverImageUrl || app.screenshots[0]} className="w-full h-full object-cover opacity-80" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-card to-transparent opacity-80"></div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                    <img src={app.iconUrl} className="w-10 h-10 rounded-lg bg-black shadow-lg" alt="" />
                    <div className="min-w-0">
                        <h3 className="font-bold text-white text-base truncate">{app.title}</h3>
                        <div className="text-xs text-nexus-sub truncate">{app.authorName}</div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                     <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                         app.pricingModel === PricingModel.SUBSCRIPTION 
                         ? 'bg-nexus-blue/10 text-nexus-blue' 
                         : 'bg-nexus-purple/10 text-nexus-purple'
                     }`}>
                        {app.pricingModel === PricingModel.SUBSCRIPTION ? '订阅生效中' : '已买断'}
                     </span>
                     {app.pricingModel === PricingModel.SUBSCRIPTION && (
                         <span className="text-[10px] text-nexus-sub flex items-center gap-1">
                             <Clock size={10} /> 剩 28 天
                         </span>
                     )}
                </div>

                <div className="mt-auto flex items-center gap-2">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenApp(app);
                        }}
                        className="flex-1 nexus-btn-primary py-2 text-sm flex items-center justify-center gap-2"
                    >
                        <Play size={14} fill="currentColor" /> 
                        <span>立即启动</span>
                    </button>
                    
                    {app.helpDocs && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onViewDocs) onViewDocs(app);
                            }}
                            className="p-2 text-nexus-sub hover:text-white hover:bg-nexus-base rounded border border-nexus-input transition-colors"
                            title="查看文档"
                        >
                            <BookOpen size={16} />
                        </button>
                    )}
                    
                    <div className="relative">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === app.id ? null : app.id);
                            }}
                            className="p-2 text-nexus-sub hover:text-white hover:bg-nexus-base rounded border border-nexus-input transition-colors"
                        >
                            <MoreVertical size={16} />
                        </button>
                        
                        {activeMenuId === app.id && (
                             <div className="absolute bottom-full right-0 mb-2 w-48 bg-nexus-card border border-nexus-input shadow-xl rounded-lg overflow-hidden z-20">
                                 <button 
                                     onClick={(e) => { e.stopPropagation(); if (onSelectApp) onSelectApp(app); }}
                                     className="w-full text-left px-4 py-2.5 text-sm text-nexus-sub hover:text-white hover:bg-nexus-base flex items-center gap-2"
                                 >
                                     <FileText size={14} /> 查看详情
                                 </button>
                                 <button 
                                     onClick={(e) => { e.stopPropagation(); handleRemoveClick(app); }}
                                     className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-nexus-base flex items-center gap-2 border-t border-nexus-input"
                                 >
                                     <Trash2 size={14} /> 移除应用
                                 </button>
                             </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;