import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ThemeContextValue } from './types';
type StyleValue = ViewStyle | TextStyle | ImageStyle;
type StyleFunction = (...args: any[]) => StyleValue;
export type FlexibleStyleDefinition = Record<string, StyleValue | StyleFunction>;
export declare const useThemeContext: () => ThemeContextValue;
export declare const useStyleProvider: () => ThemeContextValue;
export declare const createStylesheet: <T extends FlexibleStyleDefinition>(styleFunction: (context: ThemeContextValue) => T) => (context: ThemeContextValue) => T;
export declare function useStyles<T extends FlexibleStyleDefinition>(styleFunction?: ReturnType<typeof createStylesheet<T>>): {
    styles: T;
    ctx: ThemeContextValue;
};
export declare const useTheme: () => import("./types").Theme;
export declare const useThemeName: () => import("./types").ThemeName;
export declare const useBreakpoint: () => "xs" | "sm" | "md" | "lg" | "xl";
export declare const useAppearance: () => {
    appearance: import("./types").Appearance;
    setAppearance: (appearance: import("./types").Appearance) => void;
};
export {};
