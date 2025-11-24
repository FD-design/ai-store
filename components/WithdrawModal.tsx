import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, balance }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-nexus-card border border-nexus-input rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">申请提现</h2>
            <button onClick={onClose} className="text-nexus-sub hover:text-white"><X size={20}/></button>
        </div>

        {step === 'form' ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep('success'); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-nexus-sub mb-1.5">真实姓名</label>
              <input type="text" className="nexus-input w-full p-2.5 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-nexus-sub mb-1.5">联系方式</label>
              <input type="text" className="nexus-input w-full p-2.5 text-sm" required placeholder="手机 / 微信" />
            </div>
            <div>
              <label className="block text-xs font-bold text-nexus-sub mb-1.5">提现金额 (余额: {balance})</label>
              <input type="number" max={balance} className="nexus-input w-full p-2.5 text-sm" required />
            </div>
            <button type="submit" className="nexus-btn-primary w-full py-2.5 text-sm mt-2">提交申请</button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">提交成功</h2>
            <p className="text-nexus-sub text-sm mb-6">工作人员将在 1-3 个工作日内联系您。</p>
            <button onClick={onClose} className="bg-nexus-base hover:bg-nexus-input border border-nexus-input px-6 py-2 rounded-lg text-sm text-white transition-colors">
              关闭
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;