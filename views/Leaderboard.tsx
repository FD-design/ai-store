import React from 'react';
import { AIApp } from '../types';
import { Trophy, TrendingUp, Star, ArrowLeft, Download } from 'lucide-react';

interface LeaderboardProps {
  apps: AIApp[];
  onSelectApp: (app: AIApp) => void;
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ apps, onSelectApp, onBack }) => {
  const topApps = [...apps].sort((a, b) => (b.downloads * b.rating) - (a.downloads * a.rating)).slice(0, 10);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 text-nexus-sub hover:text-white"><ArrowLeft size={20} /></button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-yellow-400" size={24} /> 本周热榜
        </h1>
      </div>

      <div className="space-y-3">
        {topApps.map((app, index) => (
          <div 
            key={app.id}
            onClick={() => onSelectApp(app)}
            className="nexus-card p-4 flex items-center gap-6 hover:bg-nexus-card/80 transition-colors cursor-pointer border border-nexus-input"
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded font-bold text-sm ${index < 3 ? 'bg-nexus-green text-white' : 'bg-nexus-base text-nexus-sub'}`}>
              {index + 1}
            </div>

            <img src={app.iconUrl} className="w-12 h-12 rounded bg-black" alt={app.title} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-white truncate">{app.title}</h3>
                {index < 3 && <TrendingUp size={14} className="text-green-500" />}
              </div>
              <p className="text-nexus-sub text-sm truncate">{app.shortDescription}</p>
            </div>

            <div className="text-right">
               <div className="text-white font-bold flex items-center gap-1 justify-end">
                  {app.rating} <Star size={14} className="text-yellow-400" fill="currentColor"/>
               </div>
               <div className="text-xs text-nexus-sub flex items-center gap-1">
                  <Download size={12} /> {app.downloads.toLocaleString()}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;