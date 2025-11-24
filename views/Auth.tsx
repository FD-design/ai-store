import React, { useState } from 'react';
import { Hexagon, Mail, Lock, User as UserIcon, Github, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (role: 'user' | 'creator') => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'creator'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onLogin(role); }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nexus-base p-4 font-sans">
       <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-nexus-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-nexus-green/20">
                <Hexagon className="text-white" size={32} strokeWidth={2.5} />
             </div>
             <h1 className="text-3xl font-bold text-white tracking-tight">AI Nexus</h1>
             <p className="text-nexus-sub mt-2">连接未来的智能应用市场</p>
          </div>

          <div className="bg-nexus-card border border-nexus-input rounded-xl shadow-xl overflow-hidden">
             {/* Header Tabs */}
             <div className="flex border-b border-nexus-input bg-nexus-base/50">
                <button 
                    onClick={() => setIsLogin(true)} 
                    className={`flex-1 py-4 text-sm font-bold transition-colors ${isLogin ? 'text-white border-b-2 border-nexus-green bg-nexus-card' : 'text-nexus-sub hover:text-white'}`}
                >
                    登录账户
                </button>
                <button 
                    onClick={() => setIsLogin(false)} 
                    className={`flex-1 py-4 text-sm font-bold transition-colors ${!isLogin ? 'text-white border-b-2 border-nexus-green bg-nexus-card' : 'text-nexus-sub hover:text-white'}`}
                >
                    注册新用户
                </button>
             </div>

             <div className="p-8">
                 {/* Social Login - RESTORED */}
                 <button 
                    type="button"
                    onClick={() => onLogin('user')}
                    className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-3 transition-colors mb-6 border border-transparent hover:border-gray-500 shadow-md"
                 >
                     <Github size={20} /> 使用 GitHub 继续
                 </button>

                 <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-nexus-input"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-nexus-card px-3 text-nexus-sub font-medium">或者使用邮箱</span>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative group">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-nexus-sub group-focus-within:text-nexus-green transition-colors" size={18} />
                            <input type="text" className="nexus-input w-full py-2.5 pl-10 text-sm" placeholder="用户名" required />
                        </div>
                    )}
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-nexus-sub group-focus-within:text-nexus-green transition-colors" size={18} />
                        <input type="email" className="nexus-input w-full py-2.5 pl-10 text-sm" placeholder="电子邮箱" required />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-nexus-sub group-focus-within:text-nexus-green transition-colors" size={18} />
                        <input type="password" className="nexus-input w-full py-2.5 pl-10 text-sm" placeholder="密码" required />
                    </div>

                    <button type="submit" disabled={isLoading} className="nexus-btn-primary w-full py-3 text-sm mt-6 flex items-center justify-center gap-2 group shadow-lg shadow-green-900/20">
                        {isLoading ? '处理中...' : (isLogin ? '进入控制台' : '创建账户')}
                        {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>}
                    </button>
                 </form>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Auth;