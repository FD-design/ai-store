
import React, { useState } from 'react';
import { Search, LayoutGrid, BarChart3, Hexagon, User, Wallet, Gamepad2, Bell, LogOut, Settings, ChevronDown, Users, BadgeCheck } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  user: UserType;
  isCreator: boolean;
  onOpenWallet: () => void;
  isStandalone?: boolean;
  onToggleNotifications: () => void;
  unreadCount: number;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onChangeView, 
  user,
  isCreator,
  onOpenWallet, 
  isStandalone = false,
  onToggleNotifications,
  unreadCount,
  onLogout
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (isStandalone) return null; 

  const NavItem = ({ view, icon: Icon, label }: { view: string, icon: any, label: string }) => (
    <button 
      onClick={() => onChangeView(view)}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md relative group ${
        currentView === view 
          ? 'text-white' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon size={18} className={`transition-colors ${currentView === view ? 'text-nexus-green' : 'group-hover:text-gray-200'}`} />
      <span>{label}</span>
      {currentView === view && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-green rounded-full"></span>
      )}
    </button>
  );

  return (
    <nav className="sticky top-0 z-40 bg-nexus-base border-b border-nexus-input shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChangeView('home')}>
            <div className="w-8 h-8 flex items-center justify-center bg-nexus-green rounded-lg shadow-lg shadow-green-900/20">
              <Hexagon className="text-white" strokeWidth={2.5} size={20} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              AI Nexus
            </span>
          </div>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-4">
            <NavItem view="home" icon={LayoutGrid} label="应用市场" />
            <NavItem view="library" icon={Gamepad2} label="我的资产" />
            <NavItem view="dashboard" icon={BarChart3} label="创作者工坊" />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="搜索..." 
                className="nexus-input py-1.5 pl-9 pr-4 text-sm w-48 bg-nexus-base border-nexus-input focus:border-nexus-green placeholder-gray-600"
              />
            </div>

            <button 
              onClick={onToggleNotifications}
              className="p-2 text-gray-400 hover:text-white relative hover:bg-nexus-card rounded-md transition-colors"
            >
               <Bell size={18} />
               {unreadCount > 0 && (
                 <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-nexus-green rounded-full ring-2 ring-nexus-base"></span>
               )}
            </button>
            
            <button 
                onClick={onOpenWallet}
                className="p-2 text-gray-400 hover:text-white hover:bg-nexus-card rounded-md transition-colors"
            >
                <Wallet size={18} />
            </button>

            <div className="h-5 w-px bg-nexus-input mx-1 hidden sm:block"></div>

            {/* Profile Dropdown */}
            <div className="relative">
                <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-nexus-card rounded-full transition-colors border border-transparent hover:border-nexus-input"
                >
                    <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full bg-nexus-card object-cover ring-2 ring-nexus-base" />
                    <ChevronDown size={14} className="text-gray-500" />
                </button>

                {isProfileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-nexus-card border border-nexus-input rounded-lg shadow-xl z-50 py-1 overflow-hidden">
                        <div className="px-4 py-3 border-b border-nexus-input bg-nexus-card">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-white text-sm">{user.name}</span>
                                {isCreator ? (
                                     <span className="text-[10px] bg-nexus-green/10 text-nexus-green px-1.5 py-0.5 rounded border border-nexus-green/20 flex items-center gap-1">
                                         <BadgeCheck size={10} /> 创作者
                                     </span>
                                ) : (
                                    <span className="text-[10px] bg-nexus-base text-gray-400 px-1.5 py-0.5 rounded border border-nexus-input">
                                        用户
                                    </span>
                                )}
                            </div>
                            <div className="text-xs text-nexus-sub truncate">{user.email}</div>
                        </div>

                        <div className="py-1">
                            {[
                                { icon: User, label: '个人资料', action: 'profile' },
                                { icon: Users, label: '邀请返佣', action: 'referral' },
                                { icon: Settings, label: '账户设置', action: 'settings' }
                            ].map((item, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => { onChangeView(item.action); setIsProfileOpen(false); }}
                                    className="w-full text-left px-4 py-2 text-sm text-nexus-sub hover:text-white hover:bg-nexus-base flex items-center gap-2 transition-colors"
                                >
                                    <item.icon size={14} />
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="py-1 border-t border-nexus-input">
                            <button 
                                onClick={onLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-nexus-base flex items-center gap-2 transition-colors"
                            >
                                <LogOut size={14} /> 退出登录
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
      {isProfileOpen && <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
