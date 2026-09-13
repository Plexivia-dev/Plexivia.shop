import { create } from 'zustand';
import { ThemeId } from '@themes/types';

interface ThemeState {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

// Retrieves the initial theme from URL params, storage or fallback
const getInitialTheme = (): ThemeId => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const paramTheme = urlParams.get('theme') as ThemeId;
    if (paramTheme === 'engulfic' || paramTheme === 'default' || paramTheme === 'luxury-1') {
      return paramTheme;
    }
    const stored = localStorage.getItem('app_theme') as ThemeId;
    if (stored === 'engulfic' || stored === 'default' || stored === 'luxury-1') {
      return stored;
    }
  }
  return 'default';
};

// Global theme state management hook
export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: getInitialTheme(),
  setTheme: (theme: ThemeId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
    set({ currentTheme: theme });
  },
}));
