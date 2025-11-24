import React, { useState } from 'react';
import { AIApp } from '../types';
import { Star, Download, Crown, TrendingUp, Filter } from 'lucide-react';

interface MarketplaceProps {
  apps: AIApp[];
  onSelectApp: (app: AIApp) => void;
  onViewLeaderboard?: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ apps, onSelectApp, onViewLeaderboard }) => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'newest'>('popularity');
  const categories = ['全部', '开发工具', '设计创意', '生产力', '写作辅助', '音频处理', '数据分析'];
  
  // Featured app logic
  const featuredApp = apps.find(a => a.id === '2') || apps[1]; 

  // Filtering Logic
  let listApps = apps.filter(app => {
      const matchesCategory = selectedCategory === '全部' || app.category === selectedCategory;
      const isNotFeatured = app.id !== featuredApp.id;
      return matchesCategory && isNotFeatured;
  });

  // Sorting Logic
  listApps.sort((a, b) => {
    if (sortBy === 'popularity') return b.downloads - a.downloads;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    return 0;
  });

  // Leaderboard Logic (Top 3 only for sidebar)
  const leaderboardApps = [...apps].sort((a, b) => (b.downloads * b.rating) - (a.downloads * a.rating)).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area (3/4 width) */}
          <div className="lg:col-span-3 space-y-8">
              {/* Featured Header Section */}
              {selectedCategory === '全部' && (
                  <div 
                    onClick={() => onSelectApp(featuredApp)}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group h-[320px] bg-nexus-card border border-nexus-input hover:border-nexus-green/50 transition-colors"
                  >
                    <div className="absolute inset-0 z-0">
                        <img src={featuredApp.coverImageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Featured" />
                        <div className="absolute inset-0 bg-gradient-to-t from-nexus-base via-nexus-base/50 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-nexus-green text-white text-xs font-bold uppercase">本周精选</span>
                            <div className="flex items-center gap-1 text-white text-sm font-medium">
                                <Crown size={14} className="text-yellow-400" fill="currentColor" /> Editor's Choice
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">{featuredApp.title}</h1>
                        <p className="text-gray-300 text-lg mb-6 line-clamp-1 max-w-2xl">{featuredApp.shortDescription}</p>
                        <button className="nexus-btn-primary px-6 py-2.5 text-sm">
                            查看详情
                        </button>
                    </div>
                  </div>
              )}

              {/* Toolbar: Filter & Sort */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-30 bg-nexus-base/95 backdrop-blur py-4 border-b border-nexus-input">
                  {/* Category Scroll List - Fixed Colors & Alignment */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1 pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((cat, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 text-sm font-bold rounded-full transition-colors whitespace-nowrap border ${
                            selectedCategory === cat 
                          ? 'bg-[#10B981] border-[#10B981] text-white' // Solid green active
                          : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-nexus-card'}`} // Transparent inactive
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 min-w-fit">
                      <Filter size={14} className="text-nexus-sub" />
                      <div className="relative">
                          <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="nexus-select text-sm py-2 bg-nexus-card border border-nexus-input text-white font-medium focus:ring-0 w-36 cursor-pointer"
                          >
                              <option value="popularity">按热度排序</option>
                              <option value="rating">按评分排序</option>
                              <option value="newest">按最新排序</option>
                          </select>
                      </div>
                  </div>
              </div>

              {/* App Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listApps.map((app) => (
                  <div 
                    key={app.id}
                    onClick={() => onSelectApp(app)}
                    className="nexus-card p-5 cursor-pointer group hover:border-nexus-green/50 transition-all flex flex-col h-full hover:shadow-lg hover:shadow-black/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                        <img src={app.iconUrl} alt={app.title} className="w-12 h-12 rounded-lg bg-black object-cover" />
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            app.price === 0 
                            ? 'bg-nexus-green/10 text-nexus-green' 
                            : 'bg-nexus-purple/10 text-nexus-purple'
                        }`}>
                            {app.price === 0 ? '免费' : `¥${app.price}`}
                        </span>
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-nexus-green transition-colors truncate">{app.title}</h3>
                        <p className="text-xs text-nexus-sub mb-3">{app.authorName}</p>
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">{app.shortDescription}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-nexus-input">
                        <div className="flex items-center gap-1 text-white text-sm font-medium">
                            <Star size={14} className="text-yellow-400" fill="currentColor" />
                            <span>{app.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                            <Download size={12} />
                            <span>{app.downloads > 1000 ? (app.downloads/1000).toFixed(1) + 'k' : app.downloads}</span>
                        </div>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                         <span className={`text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400`}>
                            {app.category}
                         </span>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Sidebar Leaderboard (1/4 width) */}
          <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                  <div className="nexus-card p-4">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-white flex items-center gap-2">
                              <TrendingUp size={16} className="text-nexus-green"/> 热门榜单
                          </h3>
                      </div>
                      
                      <div className="space-y-1">
                          {leaderboardApps.map((app, idx) => (
                              <div 
                                key={app.id} 
                                onClick={() => onSelectApp(app)}
                                className="flex items-center gap-3 group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                  <div className={`w-6 h-6 shrink-0 flex items-center justify-center rounded font-bold text-xs
                                      ${idx === 0 ? 'bg-yellow-400 text-black' : 
                                        idx === 1 ? 'bg-gray-300 text-black' : 
                                        idx === 2 ? 'bg-orange-400 text-white' : 
                                        'text-nexus-sub bg-nexus-base'}`}>
                                      {idx + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <div className="truncate text-sm font-medium text-white group-hover:text-nexus-green transition-colors">{app.title}</div>
                                      <div className="text-xs text-nexus-sub truncate">
                                          {app.downloads.toLocaleString()} 下载
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>

                      <button 
                        onClick={onViewLeaderboard}
                        className="w-full mt-4 py-2 text-xs text-nexus-sub hover:text-white hover:bg-nexus-base rounded border border-nexus-input transition-colors"
                      >
                          查看完整榜单
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Marketplace;