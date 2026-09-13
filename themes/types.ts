import React from 'react';

export type ThemeId = 'default' | 'luxury-1' | 'engulfic';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  error?: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  previewColor: string;
  fontFamily: string;
  colors: ThemeColors;
}

export interface ThemeComponents {
  Layout: React.FC<{ children: React.ReactNode }>;
  Header: React.FC;
  Footer: React.FC;
  HomePage: React.FC;
  ShopPage: React.FC;
  ProductDetailsPage: React.FC;
  CartDrawer: React.FC;
  CheckoutPage: React.FC;
}

export interface ThemeDefinition {
  config: ThemeConfig;
  components: ThemeComponents;
}
