import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Floating toast feedback displaying success or bright red error notifications
export const Toast: React.FC = () => {
  const notification = useStore((state) => state.notification);

  if (!notification) return null;

  const isError = typeof notification === 'object' && notification?.type === 'error';
  const message = typeof notification === 'object' ? notification.message : notification;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100">
      <div
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#15272B] text-[#F5F7F7] shadow-xl shadow-black/40 text-xs sm:text-sm font-medium border ${
          isError ? 'border-[#EF4444]/60' : 'border-[#58C1C3]/50'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
        ) : (
          <CheckCircle className="w-4 h-4 text-[#58C1C3] flex-shrink-0" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

