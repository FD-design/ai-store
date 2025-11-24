import React, { useRef, useEffect } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  notifications, 
  isOpen, 
  onClose,
  onMarkAsRead,
  onClearAll
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={panelRef} className="absolute top-16 right-4 w-80 bg-nexus-card border border-nexus-input rounded-lg shadow-xl z-50 animate-fade-in overflow-hidden">
      <div className="p-3 border-b border-nexus-input flex justify-between items-center bg-nexus-base">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">通知</h3>
        {notifications.length > 0 && (
          <button onClick={onClearAll} className="text-xs text-nexus-sub hover:text-white">清空</button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-nexus-sub text-sm">暂无消息</div>
        ) : (
          <div className="divide-y divide-nexus-input">
            {notifications.map(n => (
              <div 
                key={n.id} 
                onClick={() => onMarkAsRead(n.id)}
                className={`p-3 flex gap-3 hover:bg-nexus-base cursor-pointer ${!n.read ? 'bg-nexus-green/5' : ''}`}
              >
                <div className="mt-0.5">
                    {n.type === 'success' ? <CheckCircle size={14} className="text-nexus-green"/> : <Info size={14} className="text-blue-400"/>}
                </div>
                <div>
                  <h4 className={`text-sm font-medium ${!n.read ? 'text-white' : 'text-gray-400'}`}>{n.title}</h4>
                  <p className="text-xs text-nexus-sub mt-0.5">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;