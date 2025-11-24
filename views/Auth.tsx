
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
    <div className="min-h-screen flex items-center justify-center bg-[#020420] p-4 font-sans relative overflow-hidden">
       {/* Ambient Background Effects */}
       <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-nexus-green/5 rounded-full blur-[120px] pointer-events-none"></div>
       <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-nexus-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="w-full max-w-md animate-fade-in relative z-10">
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-nexus-green to-emerald-700 rounded-xl shadow-lg shadow-emerald-900/40 mb-4">
                <Hexagon className="text-white fill-white/10" size={28} strokeWidth={2.5} />
             </div>
             <h1 className="text-3xl font-bold text-white tracking-tight mb-2">AI Nexus</h1>
             <p className="text-nexus-sub text-sm">连接未来的智能应用市场</p>
          </div>

          {/* Main Card with Gradient Border */}
          <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-nexus-green/30 to-nexus-blue/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-[#111827] border border-gray-800 rounded-xl shadow-2xl p-6 sm:p-8">
                
                {/* Segmented Control for Tabs */}
                <div className="flex bg-gray-800/50 p-1 rounded-lg mb-8 border border-gray-700/50">
                    <button 
                        onClick={() => setIsLogin(true)} 
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 ${
                            isLogin 
                            ? 'bg-nexus-green text-white shadow-md' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        登录账户
                    </button>
                    <button 
                        onClick={() => setIsLogin(false)} 
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 ${
                            !isLogin 
                            ? 'bg-nexus-green text-white shadow-md' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        注册新用户
                    </button>
                </div>

                {/* Social Login */}
                <button 
                    type="button"
                    onClick={() => onLogin('user')}
                    className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-3 transition-all border border-gray-700 hover:border-gray-500 shadow-sm mb-6"
                >
                    <Github size={20} /> 
                    <span>使用 GitHub 继续</span>
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wide">
                        <span className="bg-[#111827] px-3 text-gray-500 font-medium">或者使用邮箱</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-1">用户名</label>
                            <div className="relative group/input">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-nexus-green transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-gray-800/50 border border-gray-700 text-white text-sm rounded-lg focus:ring-1 focus:ring-nexus-green focus:border-nexus-green block w-full pl-10 p-2.5 transition-all" 
                                    placeholder="设置您的用户名" 
                                    required 
                                />
                            </div>
                        </div>
                    )}
                    
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 ml-1">电子邮箱</label>
                        <div className="relative group/input">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-nexus-green transition-colors" size={18} />
                            <input 
                                type="email" 
                                className="w-full bg-gray-800/50 border border-gray-700 text-white text-sm rounded-lg focus:ring-1 focus:ring-nexus-green focus:border-nexus-green block w-full pl-10 p-2.5 transition-all" 
                                placeholder="name@example.com" 
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                         <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-gray-400">密码</label>
                            {isLogin && <a href="#" className="text-xs text-nexus-green hover:underline">忘记密码?</a>}
                         </div>
                        <div className="relative group/input">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-nexus-green transition-colors" size={18} />
                            <input 
                                type="password" 
                                className="w-full bg-gray-800/50 border border-gray-700 text-white text-sm rounded-lg focus:ring-1 focus:ring-nexus-green focus:border-nexus-green block w-full pl-10 p-2.5 transition-all" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full bg-nexus-green hover:bg-emerald-600 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-emerald-900/30 mt-6"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {isLogin ? '进入控制台' : '创建账户'}
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>
              </div>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-6">
              登录即代表您同意我们的 <a href="#" className="text-gray-400 hover:text-white underline">服务条款</a> 和 <a href="#" className="text-gray-400 hover:text-white underline">隐私政策</a>
          </p>
       </div>
    </div>
  );
};

export default Auth;
