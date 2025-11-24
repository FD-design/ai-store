import React, { useState } from 'react';
import { X, Wallet, ArrowUpRight, ArrowDownLeft, Copy, CreditCard } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';
import WithdrawModal from './WithdrawModal';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'assets' | 'history'>('assets');
  const [copied, setCopied] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('0x71C...9A21');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

        <div className="relative w-full max-w-md bg-nexus-card border border-nexus-input rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-nexus-input">
             <h3 className="font-bold text-white flex items-center gap-2"><Wallet size={18}/> 我的钱包</h3>
             <button onClick={onClose} className="text-nexus-sub hover:text-white"><X size={18}/></button>
          </div>

          <div className="p-6">
            <div className="bg-nexus-base border border-nexus-input rounded-lg p-5 mb-6 text-center">
               <p className="text-nexus-sub text-xs mb-1">总资产余额</p>
               <h2 className="text-3xl font-bold text-white mb-3">¥ 1,245.80</h2>
               
               <button 
                onClick={handleCopy}
                className="mx-auto flex items-center gap-2 px-3 py-1 rounded bg-nexus-card text-xs text-nexus-green font-mono border border-nexus-input"
               >
                  0x71C...9A21
                  {copied ? <span className="text-white">已复制</span> : <Copy size={12} />}
               </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="py-2.5 rounded-lg bg-nexus-green text-white font-bold text-sm hover:bg-nexus-green-hover transition-colors">
                  充值
              </button>
              <button 
                onClick={() => setIsWithdrawOpen(true)}
                className="py-2.5 rounded-lg bg-nexus-base border border-nexus-input text-white font-bold text-sm hover:bg-nexus-input transition-colors"
              >
                  提现
              </button>
            </div>

            <div className="flex border-b border-nexus-input mb-4">
               {['assets', 'history'].map(tab => (
                   <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-nexus-green text-white' : 'border-transparent text-nexus-sub hover:text-white'}`}
                   >
                       {tab === 'assets' ? '资产列表' : '交易记录'}
                   </button>
               ))}
            </div>

            <div className="h-48 overflow-y-auto">
               {activeTab === 'assets' ? (
                   <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-nexus-base rounded-lg border border-nexus-input">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">CNY</div>
                              <div>
                                  <div className="text-sm font-medium text-white">CNY 余额</div>
                              </div>
                          </div>
                          <div className="text-sm font-bold text-white">¥ 450.00</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-nexus-base rounded-lg border border-nexus-input">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
                              <div>
                                  <div className="text-sm font-medium text-white">USDT</div>
                              </div>
                          </div>
                          <div className="text-right">
                               <div className="text-sm font-bold text-white">108.4</div>
                               <div className="text-xs text-nexus-sub">≈ ¥ 795.80</div>
                          </div>
                      </div>
                   </div>
               ) : (
                   <div className="space-y-2">
                      {MOCK_TRANSACTIONS.map(tx => (
                          <div key={tx.id} className="flex items-center justify-between p-3 bg-nexus-base rounded-lg border border-nexus-input">
                               <div className="flex items-center gap-3">
                                  <div className={`p-1.5 rounded ${tx.amount > 0 ? 'bg-green-500/10 text-green-400' : 'bg-gray-700/50 text-gray-400'}`}>
                                      {tx.amount > 0 ? <ArrowDownLeft size={14} /> : <CreditCard size={14} />}
                                  </div>
                                  <div>
                                      <div className="text-sm font-medium text-white">{tx.description}</div>
                                      <div className="text-[10px] text-nexus-sub">{tx.date}</div>
                                  </div>
                               </div>
                               <div className={`text-sm font-mono font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                               </div>
                          </div>
                      ))}
                   </div>
               )}
            </div>
          </div>
        </div>
      </div>

      <WithdrawModal 
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        balance={1245.80}
      />
    </>
  );
};

export default WalletModal;