import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AIApp, PricingModel } from '../types';

export type DeleteMode = 'DELETE_APP' | 'REMOVE_FROM_LIBRARY';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  app: AIApp;
  mode?: DeleteMode;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  app, 
  mode = 'DELETE_APP' 
}) => {
  const [confirmName, setConfirmName] = useState('');
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const isPaid = app.pricingModel !== PricingModel.FREE;
  const isCreatorMode = mode === 'DELETE_APP';
  const canDelete = isPaid ? (confirmName === app.title && agreed) : true;
  const title = isCreatorMode ? '删除应用' : '移除应用';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-nexus-card border border-nexus-input rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle size={24} className="text-red-500" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                    您确定要{isCreatorMode ? '删除' : '移除'} <strong className="text-white">"{app.title}"</strong> 吗？
                    {isPaid && <span className="block mt-1 text-red-400">此操作不可撤销。</span>}
                </p>
            </div>
        </div>

        {isPaid && (
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-xs font-bold text-nexus-sub mb-1.5">输入应用名称确认</label>
                    <input 
                        type="text" 
                        value={confirmName}
                        onChange={(e) => setConfirmName(e.target.value)}
                        className="nexus-input w-full p-2 text-sm"
                        placeholder={app.title}
                    />
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1"
                    />
                    <span className="text-xs text-nexus-sub">
                        我已知晓后果并确认操作。
                    </span>
                </label>
            </div>
        )}

        <div className="flex gap-3 justify-end">
            <button onClick={onClose} className="px-4 py-2 text-sm text-nexus-sub hover:text-white transition-colors">取消</button>
            <button 
                onClick={onConfirm}
                disabled={!canDelete}
                className={`px-4 py-2 rounded-lg text-white font-bold text-sm transition-colors ${
                    canDelete ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
                确认删除
            </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;