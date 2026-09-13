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
    if (paramTheme === 'luxury-1' || paramTheme === 'default') {
      return paramTheme;
    }
    const stored = localStorage.getItem('app_theme') as ThemeId;
    if (stored === 'luxury-1' || stored === 'default') {
      return stored;
    }
  }
  return 'luxury-1';
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
