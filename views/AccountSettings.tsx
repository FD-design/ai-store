import React from 'react';
import { User } from '../types';
import { Lock, Bell, Save } from 'lucide-react';

interface AccountSettingsProps { user: User; }

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">账户设置</h1>
      
      <div className="grid gap-6">
          <div className="nexus-card p-6 border border-nexus-input">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Lock size={20} className="text-nexus-green"/> 安全设置
              </h2>
              <div className="space-y-4 max-w-md">
                  <input type="password" className="nexus-input w-full p-2.5 text-sm" placeholder="当前密码" />
                  <input type="password" className="nexus-input w-full p-2.5 text-sm" placeholder="新密码" />
                  <button className="px-4 py-2 bg-nexus-base border border-nexus-input rounded text-sm text-white hover:bg-nexus-input transition-colors">更新密码</button>
              </div>
          </div>

          <div className="nexus-card p-6 border border-nexus-input">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Bell size={20} className="text-nexus-green"/> 通知偏好
              </h2>
              <div className="space-y-3">
                  {['产品更新', '每日推荐', '安全警报'].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2">
                          <span className="text-nexus-sub text-sm">{item}</span>
                          <input type="checkbox" defaultChecked className="accent-nexus-green w-4 h-4" />
                      </div>
                  ))}
              </div>
          </div>
          
          <div className="flex justify-end">
              <button className="nexus-btn-primary px-6 py-2 text-sm flex items-center gap-2">
                  <Save size={16} /> 保存更改
              </button>
          </div>
      </div>
    </div>
  );
};

export default AccountSettings;