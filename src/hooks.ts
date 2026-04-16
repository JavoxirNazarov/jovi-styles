import { useContext, useMemo } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import type { ThemeContextValue } from "./types";
import { ThemeContext } from "./context";

type StyleValue = ViewStyle | TextStyle | ImageStyle;
type StyleFunction = (...args: any[]) => StyleValue;

export type FlexibleStyleDefinition = Record<
  string,
  StyleValue | StyleFunction
>;

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};

export const useStyleProvider = useThemeContext;

export const createStylesheet = <T extends FlexibleStyleDefinition>(
  styleFunction: (context: ThemeContextValue) => T,
) => styleFunction;

export function useStyles<T extends FlexibleStyleDefinition>(
  styleFunction?: ReturnType<typeof createStylesheet<T>>,
) {
  const context = useThemeContext();

  const styles = useMemo(() => {
    return styleFunction?.(context) ?? ({} as T);
  }, [context, styleFunction]);

  return useMemo(() => ({ styles, ctx: context }), [styles, context]);
}

export const useTheme = () => useThemeContext().theme;
export const useThemeName = () => useThemeContext().themeName;
export const useBreakpoint = () => useThemeContext().breakpoint;

export const useAppearance = () => {
  const { appearance, setAppearance } = useThemeContext();

  return {
    appearance,
    setAppearance,
  };
};
