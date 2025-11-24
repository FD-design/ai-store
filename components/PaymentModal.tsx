import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Wallet, ArrowRight, CreditCard } from 'lucide-react';
import { AIApp } from '../types';

interface PaymentModalProps {
  app: AIApp | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ app, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'confirm' | 'method' | 'processing' | 'success'>('confirm');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'alipay' | 'card'>('wallet');

  useEffect(() => {
    if (isOpen) setStep('confirm');
  }, [isOpen]);

  if (!isOpen || !app) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
        setStep('success');
        setTimeout(() => {
            onSuccess();
            onClose();
        }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-lg bg-nexus-card border border-nexus-input rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-nexus-input">
             <h3 className="font-bold text-white">安全支付</h3>
             <button onClick={onClose} className="text-nexus-sub hover:text-white"><X size={18}/></button>
        </div>
        
        {step === 'confirm' && (
            <div className="p-6">
                <div className="bg-nexus-base border border-nexus-input rounded-lg p-4 mb-6 flex gap-4">
                    <img src={app.iconUrl} className="w-12 h-12 rounded bg-black" alt="" />
                    <div className="flex-1">
                        <h4 className="text-white font-bold">{app.title}</h4>
                        <div className="flex justify-between mt-1">
                            <span className="text-xs text-nexus-sub">{app.pricingModel}</span>
                            <span className="text-sm font-bold text-white">¥{app.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-nexus-sub mb-6 flex items-start gap-2">
                    <input type="checkbox" defaultChecked className="mt-0.5" />
                    <span>我已阅读并同意 <span className="text-nexus-green hover:underline">用户协议</span>。</span>
                </div>

                <button onClick={() => setStep('method')} className="nexus-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2">
                    确认并支付 <ArrowRight size={16} />
                </button>
            </div>
        )}

        {step === 'method' && (
            <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">选择支付方式</h3>
                <div className="space-y-3 mb-8">
                    <div 
                        onClick={() => setPaymentMethod('wallet')}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'wallet' ? 'bg-nexus-green/10 border-nexus-green' : 'bg-nexus-base border-nexus-input'}`}
                    >
                        <Wallet size={20} className={paymentMethod === 'wallet' ? 'text-nexus-green' : 'text-gray-400'} />
                        <div className="flex-1">
                            <div className="text-white font-medium text-sm">平台余额</div>
                            <div className="text-xs text-nexus-sub">可用: ¥ 1,245.80</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-nexus-green' : 'border-gray-600'}`}>
                            {paymentMethod === 'wallet' && <div className="w-2 h-2 rounded-full bg-nexus-green" />}
                        </div>
                    </div>
                    
                    <div 
                        onClick={() => setPaymentMethod('alipay')}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'alipay' ? 'bg-nexus-green/10 border-nexus-green' : 'bg-nexus-base border-nexus-input'}`}
                    >
                        <CreditCard size={20} className={paymentMethod === 'alipay' ? 'text-nexus-green' : 'text-gray-400'} />
                        <div className="flex-1">
                            <div className="text-white font-medium text-sm">支付宝 / 微信</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'alipay' ? 'border-nexus-green' : 'border-gray-600'}`}>
                            {paymentMethod === 'alipay' && <div className="w-2 h-2 rounded-full bg-nexus-green" />}
                        </div>
                    </div>
                </div>

                <button onClick={handlePay} className="nexus-btn-primary w-full py-3 text-sm">
                    支付 ¥{app.price.toFixed(2)}
                </button>
            </div>
        )}

        {step === 'processing' && (
            <div className="p-12 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-nexus-input border-t-nexus-green rounded-full animate-spin mb-4"></div>
                <p className="text-nexus-sub text-sm">正在处理交易...</p>
            </div>
        )}

        {step === 'success' && (
            <div className="p-12 flex flex-col items-center justify-center">
                <CheckCircle2 size={48} className="text-nexus-green mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">支付成功</h3>
                <p className="text-nexus-sub text-sm">您已获得授权</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;