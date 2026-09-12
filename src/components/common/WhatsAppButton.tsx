import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../../config';

interface WhatsAppButtonProps {
  label?: string;
  customMessage?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'pill';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label = 'Chat on WhatsApp',
  customMessage,
  className = '',
  size = 'md',
  variant = 'primary',
}) => {
  const url = getWhatsAppUrl(customMessage);

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-full',
    md: 'px-6 py-2.5 text-sm font-semibold rounded-full',
    lg: 'px-8 py-3.5 text-base font-bold rounded-full',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#25D366] text-black font-bold hover:bg-[#20bd5a] shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all transform active:scale-95',
    outline:
      'border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-all',
    pill:
      'bg-[#122225] border border-[#25D366]/50 text-[#F5F7F7] hover:border-[#25D366] hover:bg-[#25D366]/15 transition-all',
  }[variant];

  return (
    <a
      id="whatsapp-chat-button"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 transition-all ${sizeClasses} ${variantClasses} ${className}`}
      aria-label="Chat with Plexivia on WhatsApp"
    >
      <MessageCircle className={size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5'} />
      <span>{label}</span>
    </a>
  );
};
