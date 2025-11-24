import React from 'react';
import { User } from '../types';
import { Mail, Calendar, ShieldCheck } from 'lucide-react';

interface UserProfileProps { user: User; }

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="nexus-card p-8 border border-nexus-input">
          <div className="flex items-center gap-6 mb-8">
              <img src={user.avatarUrl} className="w-24 h-24 rounded-full bg-nexus-base" alt="" />
              <div>
                  <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                  <p className="text-nexus-sub flex items-center gap-2 text-sm"><Mail size={14}/> {user.email}</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-nexus-input pt-6">
              <div className="bg-nexus-base p-4 rounded-lg">
                  <div className="text-nexus-sub text-xs font-bold uppercase mb-1">类型</div>
                  <div className="text-white font-medium flex items-center gap-2"><ShieldCheck size={16}/> {user.role}</div>
              </div>
              <div className="bg-nexus-base p-4 rounded-lg">
                  <div className="text-nexus-sub text-xs font-bold uppercase mb-1">加入时间</div>
                  <div className="text-white font-medium flex items-center gap-2"><Calendar size={16}/> {user.joinDate || '2023-10'}</div>
              </div>
              <div className="bg-nexus-base p-4 rounded-lg">
                  <div className="text-nexus-sub text-xs font-bold uppercase mb-1">余额</div>
                  <div className="text-nexus-green font-bold">¥ {user.balance.toFixed(2)}</div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default UserProfile;