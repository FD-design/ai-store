
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Marketplace from './views/Marketplace';
import AppLandingPage from './views/AppLandingPage';
import CreatorDashboard from './views/CreatorDashboard';
import Library from './views/Library';
import AppRuntime from './views/AppRuntime';
import Auth from './views/Auth';
import UserProfile from './views/UserProfile';
import AccountSettings from './views/AccountSettings';
import ReferralSystem from './views/ReferralSystem';
import Leaderboard from './views/Leaderboard';
import WalletModal from './components/WalletModal';
import PaymentModal from './components/PaymentModal';
import ShareModal from './components/ShareModal';
import NotificationCenter from './components/NotificationCenter';
import DocsModal from './components/DocsModal';
import { AIApp, AppStatus, Notification, User } from './types';
import { MOCK_APPS } from './constants';

const App: React.FC = () => {
  // User State
  const [user, setUser] = useState<User | null>(null);

  // Navigation State
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedApp, setSelectedApp] = useState<AIApp | null>(null);
  const [isStandaloneMode, setIsStandaloneMode] = useState(false);
  
  // Modal State
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [paymentTargetApp, setPaymentTargetApp] = useState<AIApp | null>(null);
  
  // Docs Modal State
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [docsTargetApp, setDocsTargetApp] = useState<AIApp | null>(null);

  // Data State
  const [apps, setApps] = useState<AIApp[]>(MOCK_APPS);
  const [purchasedAppIds, setPurchasedAppIds] = useState<string[]>(['3']); 
  const [trialUsage, setTrialUsage] = useState<Record<string, number>>({}); 
  
  const [notifications, setNotifications] = useState<Notification[]>([
      { id: '1', title: '欢迎加入 AI Nexus', message: '开启您的云端智能之旅。', type: 'info', timestamp: Date.now() - 100000, read: false }
  ]);

  const addNotification = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error') => {
      setNotifications(prev => [{
          id: Date.now().toString(),
          title,
          message,
          type,
          timestamp: Date.now(),
          read: false
      }, ...prev]);
  };

  const handleLogin = () => {
      // Role is now effectively ignored for access control, defaulting to 'user' but enabling all features
      setUser({
          id: 'u_123',
          name: 'Demo User',
          email: 'demo@nexus.ai',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          role: 'user', 
          balance: 1245.80,
          joinDate: '2023-10-15'
      });
      addNotification('登录成功', `欢迎回来，Demo User`, 'success');
  };

  const handleLogout = () => {
      setUser(null);
      setCurrentView('home');
  };

  const handleSelectApp = (app: AIApp) => {
    setSelectedApp(app);
    setCurrentView('detail');
    setIsStandaloneMode(false); 
    window.scrollTo(0, 0);
  };

  const handleShareApp = () => {
      setIsShareModalOpen(true);
  };
  
  const handleViewDocs = (app: AIApp) => {
      setDocsTargetApp(app);
      setIsDocsOpen(true);
  };

  const handleBackToMarketplace = () => {
    setSelectedApp(null);
    setCurrentView('home');
    setIsStandaloneMode(false);
  };

  const handlePublishApp = (appData: AIApp, isUpdate: boolean) => {
    if (isUpdate) {
        setApps(prev => prev.map(a => a.id === appData.id ? appData : a));
        addNotification('提交成功', `"${appData.title}" 已提交审核`, 'info');
    } else {
        setApps([appData, ...apps]);
        addNotification('提交成功', `"${appData.title}" 已提交审核，请耐心等待`, 'info');
    }

    setTimeout(() => {
        setApps(prev => prev.map(a => {
            if (a.id === appData.id) {
                return { 
                    ...a, 
                    status: AppStatus.PUBLISHED,
                    versionHistory: isUpdate ? [{ 
                        version: a.currentVersion, 
                        date: new Date().toISOString().split('T')[0], 
                        changes: ['常规更新与优化'] 
                    }, ...(a.versionHistory || [])] : []
                };
            }
            return a;
        }));
        
        addNotification(
            '审核通过', 
            `恭喜！您的应用 "${appData.title}" 已通过审核并正式发布。`, 
            'success'
        );
    }, 5000);
  };

  const handleDeleteApp = (app: AIApp) => {
    setApps(prev => prev.filter(a => a.id !== app.id));
    addNotification('删除成功', `应用 "${app.title}" 已从平台下架`, 'warning');
  };

  const handleRemoveFromLibrary = (app: AIApp) => {
      setPurchasedAppIds(prev => prev.filter(id => id !== app.id));
      addNotification('已移除', `应用 "${app.title}" 已从您的资产库中移除`, 'warning');
  };

  const handleSubscribe = (app: AIApp) => {
    if (purchasedAppIds.includes(app.id)) {
        alert("您已拥有此应用，请前往资产库启动。");
        return;
    }
    setPaymentTargetApp(app);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (paymentTargetApp) {
        setPurchasedAppIds(prev => [...prev, paymentTargetApp.id]);
        addNotification('交易成功', `您已获得 "${paymentTargetApp.title}" 的使用权`, 'success');
    }
  };

  const handleLaunchApp = (app: AIApp) => {
      const isOwned = purchasedAppIds.includes(app.id);
      
      if (!isOwned) {
          // Trial Logic
          const currentTrials = trialUsage[app.id] ?? 3; // Default 3 trials
          if (currentTrials > 0) {
              setTrialUsage(prev => ({ ...prev, [app.id]: currentTrials - 1 }));
              setSelectedApp(app);
              setCurrentView('runtime');
          } else {
              setSelectedApp(app); 
              setCurrentView('runtime'); 
          }
      } else {
          // Full Access
          setSelectedApp(app);
          setCurrentView('runtime');
      }
  };

  const marketApps = apps.filter(app => app.status === AppStatus.PUBLISHED);
  const myApps = apps.filter(app => app.authorName === 'You' || app.authorName === '极客工坊');
  const purchasedApps = apps.filter(app => purchasedAppIds.includes(app.id));

  if (!user) {
      return <Auth onLogin={handleLogin} />;
  }

  // Determine if user is a creator (has published apps)
  const isCreator = myApps.length > 0;

  return (
    <div className="min-h-screen bg-[#020420] font-sans selection:bg-nexus-green selection:text-white pb-12 relative">
      <Navbar 
        currentView={currentView} 
        onChangeView={(view) => { setCurrentView(view); setIsStandaloneMode(false); }}
        user={user}
        isCreator={isCreator}
        onLogout={handleLogout}
        onOpenWallet={() => setIsWalletOpen(true)}
        isStandalone={isStandaloneMode || currentView === 'runtime'}
        onToggleNotifications={() => setIsNotificationOpen(!isNotificationOpen)}
        unreadCount={notifications.filter(n => !n.read).length}
      />
      
      <NotificationCenter 
         isOpen={isNotificationOpen}
         notifications={notifications}
         onClose={() => setIsNotificationOpen(false)}
         onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n))}
         onClearAll={() => setNotifications([])}
      />

      <main>
        {currentView === 'home' && !isStandaloneMode && (
          <Marketplace 
            apps={marketApps} 
            onSelectApp={handleSelectApp} 
            onViewLeaderboard={() => setCurrentView('leaderboard')}
          />
        )}

        {currentView === 'leaderboard' && !isStandaloneMode && (
           <Leaderboard 
             apps={marketApps}
             onSelectApp={handleSelectApp}
             onBack={() => setCurrentView('home')}
           />
        )}

        {currentView === 'library' && !isStandaloneMode && (
           <Library 
             purchasedApps={purchasedApps}
             onOpenApp={handleLaunchApp}
             onSelectApp={handleSelectApp}
             onViewDocs={handleViewDocs}
             onRemoveApp={handleRemoveFromLibrary}
           />
        )}

        {currentView === 'profile' && !isStandaloneMode && (
            <UserProfile user={user} />
        )}
        
        {currentView === 'settings' && !isStandaloneMode && (
            <AccountSettings user={user} />
        )}

        {currentView === 'referral' && !isStandaloneMode && (
            <ReferralSystem />
        )}

        {currentView === 'detail' && selectedApp && (
          <AppLandingPage 
            app={selectedApp} 
            isStandalone={isStandaloneMode}
            isOwned={purchasedAppIds.includes(selectedApp.id)}
            trialRemaining={trialUsage[selectedApp.id] ?? 3}
            onBack={handleBackToMarketplace} 
            onSubscribe={handleSubscribe}
            onLaunch={handleLaunchApp}
            onShare={handleShareApp}
            onViewDocs={handleViewDocs}
          />
        )}

        {currentView === 'runtime' && selectedApp && (
            <AppRuntime 
                app={selectedApp} 
                onExit={() => setCurrentView('detail')} 
                isTrial={!purchasedAppIds.includes(selectedApp.id)}
                trialRemaining={trialUsage[selectedApp.id] ?? 3}
            />
        )}

        {currentView === 'dashboard' && !isStandaloneMode && (
          <CreatorDashboard 
            myApps={myApps}
            onPublish={handlePublishApp}
            onViewApp={handleSelectApp}
            onDelete={handleDeleteApp}
          />
        )}
      </main>

      <WalletModal 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)} 
      />
      
      <PaymentModal 
        isOpen={isPaymentOpen}
        app={paymentTargetApp}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        app={selectedApp}
      />

      {/* Global Docs Modal */}
      {docsTargetApp && (
        <DocsModal 
          isOpen={isDocsOpen}
          onClose={() => setIsDocsOpen(false)}
          title={docsTargetApp.title}
          content={docsTargetApp.helpDocs || ''}
        />
      )}
    </div>
  );
};

export default App;
