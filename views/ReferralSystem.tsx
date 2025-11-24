import React, { useState } from 'react';
import { Users, DollarSign, Copy, Check } from 'lucide-react';
import { MOCK_REFERRAL_STATS, MOCK_REFERRAL_CHART } from '../constants';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ReferralSystem: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const stats = MOCK_REFERRAL_STATS;

  const handleCopy = () => {
    navigator.clipboard.writeText(stats.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-2">邀请返佣</h1>
      <p className="text-nexus-sub mb-8">邀请好友，赚取 20% 佣金。</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
            { label: '累计邀请', value: stats.totalInvited + ' 人', icon: Users },
            { label: '累计收益', value: '¥' + stats.totalEarnings.toFixed(2), icon: DollarSign },
            { label: '待结算', value: '¥' + stats.pendingEarnings.toFixed(2), icon: DollarSign }
        ].map((stat, i) => (
            <div key={i} className="nexus-card p-6 border border-nexus-input">
                <div className="flex items-center gap-2 text-nexus-sub text-xs font-bold uppercase mb-2">
                    <stat.icon size={14} /> {stat.label}
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
              <div className="nexus-card p-6 border border-nexus-input">
                  <h3 className="font-bold text-white mb-4">专属链接</h3>
                  <div className="bg-nexus-base p-3 rounded border border-nexus-input text-nexus-sub text-xs font-mono mb-4 break-all">
                      {stats.referralLink}
                  </div>
                  <button onClick={handleCopy} className="nexus-btn-primary w-full py-2 text-sm flex items-center justify-center gap-2">
                      {copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? '已复制' : '复制'}
                  </button>
              </div>
          </div>

          <div className="lg:col-span-2 nexus-card p-6 border border-nexus-input">
               <h3 className="font-bold text-white mb-6">收益趋势</h3>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_REFERRAL_CHART}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="date" stroke="#9CA3AF" axisLine={false} tickLine={false} />
                      <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{backgroundColor:'#1F2937', border:'1px solid #374151'}} />
                      <Area type="monotone" dataKey="earnings" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
          </div>
      </div>
    </div>
  );
};

export default ReferralSystem;