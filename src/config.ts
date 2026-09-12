const env = typeof import.meta !== 'undefined'
  ? (import.meta as unknown as { env?: Record<string, string> }).env
  : undefined;

export const CONFIG = {
  brand: {
    name: 'PLEXIVIA',
    tagline: 'Crafting Digital Dreams',
    colors: {
      dark: '#0C1618',
      surface: '#122225',
      card: '#15272B',
      border: '#1E373D',
      cyan: '#58C1C3',
      green: '#97CC6F',
      white: '#F5F7F7',
    },
  },
  // Reusable Google Calendar Booking URL (configured via env or fallback)
  googleCalendarUrl:
    env?.VITE_GOOGLE_CALENDAR_URL ||
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0plexivia-demo',
  // Reusable WhatsApp contact configuration
  whatsAppNumber:
    env?.VITE_WHATSAPP_NUMBER ||
    '8801700000000',
  whatsAppDefaultMessage:
    "Hi Plexivia, I'm interested in discussing a website or e-commerce solution.",
  currencySymbol: '৳ ',
};

export const getWhatsAppUrl = (customMessage?: string): string => {
  const message = encodeURIComponent(customMessage || CONFIG.whatsAppDefaultMessage);
  return `https://wa.me/${CONFIG.whatsAppNumber}?text=${message}`;
};
