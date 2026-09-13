import React, { useState } from 'react';
import { Palette, Check, Sparkles, X } from 'lucide-react';
import { useThemeStore } from '@/src/store/useThemeStore';
import { getAvailableThemes, ThemeId } from '@themes/index';

// Floating theme preview switcher allowing live storefront template toggling
export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme } = useThemeStore();
  const availableThemes = getAvailableThemes();

  const handleSelectTheme = (id: ThemeId) => {
    setTheme(id);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 p-4 w-72 bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white uppercase">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>STOREFRONT THEMES</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {availableThemes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-md shrink-0"
                      style={{ backgroundColor: theme.previewColor }}
                    />
                    <div>
                      <p className="text-xs font-bold uppercase">{theme.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono line-clamp-1">
                        {theme.tagline}
                      </p>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-orange-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 rounded-full text-white text-xs font-mono font-bold shadow-2xl backdrop-blur-xl transition hover:scale-105 cursor-pointer group"
      >
        <Palette className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform" />
        <span>Theme: {currentTheme === 'engulfic' ? 'Engulfic' : 'Plexivia'}</span>
      </button>
    </div>
  );
};
