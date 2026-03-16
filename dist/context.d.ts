import type { ThemeContextValue, ThemeProviderProps } from "./types";
export declare const DEFAULT_THEME_STORAGE_KEY = "preferredTheme";
export declare const ThemeContext: import("react").Context<ThemeContextValue | null>;
export declare const StyleProvider: ({ children, defaultTheme, storage, storageKey, theming, breakpoints, }: ThemeProviderProps) => import("react/jsx-runtime").JSX.Element;
