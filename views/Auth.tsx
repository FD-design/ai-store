
import React, { useState } from 'react';
import { Hexagon, Mail, Lock, User as UserIcon, Github, ArrowRight, AlertCircle } from 'lucide-react';

interface AuthProps {
  onLogin: (role: 'user' | 'creator') => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '' };

    if (!isLogin && !formData.username.trim()) {
      newErrors.username = '请输入用户名';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入电子邮箱';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少为 6 位';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => { 
        setIsLoading(false); 
        onLogin('user'); 
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof errors]) {
          setErrors(prev => ({ ...prev, [name]: '' }));
      }
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

          {/* Main Card */}
          <div className="relative group">
              {/* Glow Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-nexus-green/30 to-nexus-blue/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-[#111827] border border-gray-800 rounded-xl shadow-2xl p-6 sm:p-8">
                
                {/* Segmented Control */}
                <div className="flex bg-gray-900/50 p-1.5 rounded-lg mb-8 border border-gray-800">
                    <button 
                        onClick={() => { setIsLogin(true); setErrors({username:'',email:'',password:''}); }} 
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 ${
                            isLogin 
                            ? 'bg-nexus-green text-white shadow-lg shadow-emerald-900/20' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        登录账户
                    </button>
                    <button 
                        onClick={() => { setIsLogin(false); setErrors({username:'',email:'',password:''}); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 ${
                            !isLogin 
                            ? 'bg-nexus-green text-white shadow-lg shadow-emerald-900/20' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        注册新用户
                    </button>
                </div>

                {/* GitHub Login */}
                <button 
                    type="button"
                    onClick={() => onLogin('user')}
                    className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-3 transition-all border border-gray-700 hover:border-gray-600 shadow-sm mb-6 active:scale-[0.98]"
                >
                    <Github size={20} /> 
                    <span>使用 GitHub 继续</span>
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wide">
                        <span className="bg-[#111827] px-3 text-gray-500 font-medium">或者使用邮箱</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {!isLogin && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 ml-1">用户名</label>
                            <div className="relative group/input">
                                <UserIcon className={`absolute left-3 top-3.5 ${errors.username ? 'text-red-500' : 'text-gray-500 group-focus-within:text-nexus-green'} transition-colors`} size={18} />
                                <input 
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-900/50 border text-white text-sm rounded-lg block w-full pl-10 p-3 transition-all placeholder-gray-600 ${errors.username ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-800 focus:border-nexus-green focus:ring-1 focus:ring-nexus-green'}`}
                                    placeholder="设置您的用户名" 
                                />
                            </div>
                            {errors.username && <p className="text-xs text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={12}/> {errors.username}</p>}
                        </div>
                    )}
                    
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 ml-1">电子邮箱</label>
                        <div className="relative group/input">
                            <Mail className={`absolute left-3 top-3.5 ${errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-nexus-green'} transition-colors`} size={18} />
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full bg-gray-900/50 border text-white text-sm rounded-lg block w-full pl-10 p-3 transition-all placeholder-gray-600 ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-800 focus:border-nexus-green focus:ring-1 focus:ring-nexus-green'}`}
                                placeholder="name@example.com" 
                            />
                        </div>
                        {errors.email && <p className="text-xs text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={12}/> {errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                         <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-gray-400">密码</label>
                            {isLogin && <a href="#" className="text-xs text-nexus-green hover:underline">忘记密码?</a>}
                         </div>
                        <div className="relative group/input">
                            <Lock className={`absolute left-3 top-3.5 ${errors.password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-nexus-green'} transition-colors`} size={18} />
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full bg-gray-900/50 border text-white text-sm rounded-lg block w-full pl-10 p-3 transition-all placeholder-gray-600 ${errors.password ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-800 focus:border-nexus-green focus:ring-1 focus:ring-nexus-green'}`}
                                placeholder="••••••••" 
                            />
                        </div>
                        {errors.password && <p className="text-xs text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={12}/> {errors.password}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full bg-nexus-green hover:bg-emerald-600 text-white font-bold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] shadow-lg shadow-emerald-900/30 mt-6"
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
          
          <p className="text-center text-xs text-gray-600 mt-8">
              登录即代表您同意我们的 <a href="#" className="text-gray-500 hover:text-white underline transition-colors">服务条款</a> 和 <a href="#" className="text-gray-500 hover:text-white underline transition-colors">隐私政策</a>
          </p>
       </div>
    </div>
  );
};

export default Auth;
