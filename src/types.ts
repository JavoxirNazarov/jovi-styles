import type { PropsWithChildren } from "react";
import type { EdgeInsets } from "react-native-safe-area-context";
import type { Breakpoint, Breakpoints } from "./breakpoints";

export type Appearance = "auto" | "light" | "dark";
export type ThemeName = "light" | "dark";
export interface Theme {}

export interface ThemeStorage {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
  removeItem?: (key: string) => void | Promise<void>;
}

export interface ThemingConfig {
  light?: Theme;
  dark?: Theme;
}

export interface ThemeProviderProps extends PropsWithChildren {
  defaultAppearance?: Appearance;
  defaultTheme?: ThemeName;
  storage?: ThemeStorage | null;
  storageKey?: string;
  theming: ThemingConfig;
  breakpoints?: Breakpoints;
}

export interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  appearance: Appearance;
  setAppearance: (appearance: Appearance) => void;
  breakpoint: Breakpoint;
  screenWidth: number;
  screenHeight: number;
  insets: EdgeInsets;
}
