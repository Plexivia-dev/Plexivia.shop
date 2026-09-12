import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const notification = useStore((state) => state.notification);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#15272B] border border-[#58C1C3]/50 text-[#F5F7F7] shadow-xl shadow-black/40 text-xs sm:text-sm font-medium">
        <CheckCircle className="w-4 h-4 text-[#58C1C3] flex-shrink-0" />
        <span>{notification}</span>
      </div>
    </div>
  );
};
