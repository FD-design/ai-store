import React, { useState } from 'react';
import { X, Copy, Check, Link as LinkIcon, Image, Code } from 'lucide-react';
import { AIApp } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: AIApp | null;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, app }) => {
  const [activeTab, setActiveTab] = useState<'link' | 'poster' | 'embed'>('link');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !app) return null;

  const referralCode = `ref_${Math.random().toString(36).substr(2, 6)}`;
  const shareUrl = `${app.deployment.url}?ref=${referralCode}`;
  const embedCode = `<iframe src="${app.deployment.url}/embed" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-xl bg-nexus-card border border-nexus-input rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b border-nexus-input">
             <h3 className="font-bold text-white">邀请返佣</h3>
             <button onClick={onClose} className="text-nexus-sub hover:text-white"><X size={18}/></button>
        </div>

        <div className="flex h-full min-h-[400px]">
            {/* Sidebar */}
            <div className="w-40 border-r border-nexus-input bg-nexus-base p-2 space-y-1">
                {[
                    { id: 'link', icon: LinkIcon, label: '链接' },
                    { id: 'poster', icon: Image, label: '海报' },
                    { id: 'embed', icon: Code, label: '嵌入' },
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id ? 'bg-nexus-green/10 text-nexus-green' : 'text-nexus-sub hover:text-white hover:bg-nexus-card'}`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'link' && (
                    <div className="space-y-6">
                        <div className="bg-nexus-base border border-nexus-input rounded-lg overflow-hidden">
                             <div className="h-32 bg-gray-800 relative">
                                 <img src={app.coverImageUrl} className="w-full h-full object-cover opacity-50" alt="" />
                                 <div className="absolute bottom-4 left-4 font-bold text-white text-lg">{app.title}</div>
                             </div>
                             <div className="p-3 text-xs text-nexus-sub">nexus.ai/app/{app.id}</div>
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-nexus-sub block mb-2">专属链接</label>
                            <div className="flex gap-2">
                                <input readOnly value={shareUrl} className="nexus-input flex-1 p-2 text-sm font-mono text-nexus-sub" />
                                <button 
                                    onClick={() => handleCopy(shareUrl)}
                                    className="nexus-btn-primary px-3"
                                >
                                    {copied ? <Check size={16}/> : <Copy size={16}/>}
                                </button>
                            </div>
                            <p className="text-xs text-green-500 mt-2">分享此链接可获 20% 返佣</p>
                        </div>
                    </div>
                )}
                
                {activeTab === 'embed' && (
                    <div>
                        <label className="text-xs font-bold text-nexus-sub block mb-2">Embed Code</label>
                        <textarea readOnly value={embedCode} className="nexus-input w-full h-32 p-3 text-xs font-mono mb-2" />
                        <button onClick={() => handleCopy(embedCode)} className="text-xs text-nexus-green font-bold">复制代码</button>
                    </div>
                )}
                
                {activeTab === 'poster' && (
                    <div className="text-center text-nexus-sub py-10">海报生成功能开发中...</div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;