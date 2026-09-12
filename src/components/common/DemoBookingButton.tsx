import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface DemoBookingButtonProps {
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'glow';
  showIcon?: boolean;
}

export const DemoBookingButton: React.FC<DemoBookingButtonProps> = ({
  label = 'View Demo',
  className = '',
  size = 'md',
  variant = 'primary',
  showIcon = true,
}) => {
  const setIsCalendarModalOpen = useStore((state) => state.setIsCalendarModalOpen);

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-full',
    md: 'px-6 py-2.5 text-sm font-semibold rounded-full',
    lg: 'px-8 py-3.5 text-base font-bold rounded-full',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#58C1C3] text-[#0C1618] hover:bg-[#97CC6F] shadow-[0_0_20px_rgba(88,193,195,0.35)] hover:shadow-[0_0_25px_rgba(151,204,111,0.5)] transition-all duration-300 transform active:scale-95',
    outline:
      'border border-[#58C1C3] text-[#58C1C3] hover:bg-[#58C1C3]/10 hover:border-[#97CC6F] hover:text-[#97CC6F] transition-all duration-300',
    glow:
      'bg-gradient-to-r from-[#58C1C3] to-[#97CC6F] text-[#0C1618] font-bold shadow-[0_0_30px_rgba(88,193,195,0.45)] hover:shadow-[0_0_40px_rgba(151,204,111,0.6)] hover:brightness-105 transition-all duration-300 transform active:scale-95',
  }[variant];

  return (
    <button
      id={`demo-booking-btn-${label.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => setIsCalendarModalOpen(true)}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all ${sizeClasses} ${variantClasses} ${className}`}
      aria-label="Book a Demo via Google Calendar"
    >
      {showIcon && <Calendar className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      <span>{label}</span>
      <ArrowUpRight className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4 opacity-75'} />
    </button>
  );
};
