
import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'info' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  title, 
  message, 
  confirmText = '确认', 
  cancelText = '取消',
  type = 'info',
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel}></div>
      
      <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-in">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full shrink-0 ${type === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-nexus-primary/10 text-nexus-primary'}`}>
            {type === 'danger' ? <AlertTriangle size={24} /> : <AlertTriangle size={24} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{message}</p>
            
            <div className="flex gap-3">
               <button 
                onClick={onCancel}
                className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-bold transition-colors"
               >
                 {cancelText}
               </button>
               <button 
                onClick={onConfirm}
                className={`flex-1 py-2 rounded-lg text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 ${type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-nexus-primary hover:bg-nexus-primary/80'}`}
               >
                 {confirmText}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
