import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full h-full md:w-[80vw] md:h-[90vh] bg-nexus-card rounded-xl shadow-2xl flex flex-col overflow-hidden border border-nexus-input">
        
        <div className="flex items-center justify-between p-4 border-b border-nexus-input bg-nexus-card">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-nexus-green" />
            <span className="font-bold text-white">{title} - 开发文档</span>
          </div>
          <button onClick={onClose} className="text-nexus-sub hover:text-white"><X size={20}/></button>
        </div>

        <div className="flex flex-1 overflow-hidden bg-nexus-base">
          {/* Sidebar */}
          <div className="w-64 border-r border-nexus-input bg-nexus-card p-4 hidden md:block overflow-y-auto">
             <h4 className="text-xs font-bold text-nexus-sub uppercase mb-4">目录</h4>
             <ul className="space-y-1 text-sm">
               <li className="px-2 py-1.5 bg-nexus-green/10 text-nexus-green rounded cursor-pointer font-medium">1. 快速开始</li>
               <li className="px-2 py-1.5 text-nexus-sub hover:text-white cursor-pointer">2. 认证鉴权</li>
               <li className="px-2 py-1.5 text-nexus-sub hover:text-white cursor-pointer">3. 接口参考</li>
               <li className="px-2 py-1.5 text-nexus-sub hover:text-white cursor-pointer">4. FAQ</li>
             </ul>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
             <div className="max-w-3xl mx-auto prose prose-invert prose-headings:text-white prose-a:text-nexus-green prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700">
               <h1 className="text-3xl font-bold mb-6">{title} 使用指南</h1>
               {content ? (
                 <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">{content}</div>
               ) : (
                 <div className="text-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-lg">
                    暂无文档内容
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsModal;