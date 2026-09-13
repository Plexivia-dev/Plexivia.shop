import { ThemeId, ThemeDefinition, ThemeConfig } from './types';
import { defaultTheme } from './default';

export * from './types';

// Registry holding all initialized theme definitions
const themeRegistry: Record<string, ThemeDefinition> = {
  default: defaultTheme,
};

// Registers a theme definition dynamically
export const registerTheme = (definition: ThemeDefinition) => {
  themeRegistry[definition.config.id] = definition;
};

// Resolves a theme definition by its ID with fallback to default
export const getTheme = (id: ThemeId): ThemeDefinition => {
  return themeRegistry[id] || defaultTheme;
};

// Returns metadata for all registered themes for the theme selector UI
export const getAvailableThemes = (): ThemeConfig[] => {
  return Object.values(themeRegistry).map((t) => t.config);
};
