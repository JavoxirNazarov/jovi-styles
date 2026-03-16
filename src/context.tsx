import { createContext, useCallback, useMemo, useState } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  breakpoints as fallbackBreakpoints,
  getBreakpointForWidth,
} from "./breakpoints";
import type {
  Appearance,
  ThemeContextValue,
  ThemeName,
  ThemeProviderProps,
  ThemeStorage,
} from "./types";

export const DEFAULT_THEME_STORAGE_KEY = "preferredTheme";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const useAdaptiveTheme = ({
  storage,
  storageKey,
  defaultTheme = "light",
}: {
  storage: ThemeStorage;
  storageKey: string;
  defaultTheme?: ThemeName;
}) => {
  const colorScheme = useColorScheme();

  const [appearance, setAppearance] = useState<Appearance>(() => {
    const savedTheme = storage.getItem(storageKey) ?? "auto";
    return savedTheme as Appearance;
  });

  const handleSetAppearance = useCallback(
    (val: Appearance) => {
      setAppearance(val);
      storage.setItem(storageKey, val);
    },
    [storage, storageKey],
  );

  const themeName = (
    appearance === "auto" ? (colorScheme ?? defaultTheme) : appearance
  ) as ThemeName;

  return { themeName, setAppearance: handleSetAppearance, appearance };
};

const ThemeProvider = ({
  children,
  defaultTheme,
  storage,
  storageKey = DEFAULT_THEME_STORAGE_KEY,
  theming,
  breakpoints = fallbackBreakpoints,
}: ThemeProviderProps) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  if (!storage) {
    throw new Error(
      "ThemeProvider requires a storage prop to persist theme preference.",
    );
  }

  const { themeName, setAppearance, appearance } = useAdaptiveTheme({
    storage,
    storageKey,
    defaultTheme,
  });

  const theme = useMemo(() => {
    const resolvedThemes = {
      light: theming?.light ?? theming?.dark,
      dark: theming?.dark ?? theming?.light,
    };

    return themeName === "dark" ? resolvedThemes.dark : resolvedThemes.light;
  }, [theming, themeName]);

  if (!theme) {
    throw new Error(
      "light or dark themes must be provided in the theming prop.",
    );
  }

  const breakpoint = useMemo(
    () => getBreakpointForWidth(width, breakpoints),
    [width, breakpoints],
  );

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      themeName,
      appearance,
      setAppearance,
      breakpoint,
      screenWidth: width,
      screenHeight: height,
      insets,
    }),
    [
      appearance,
      breakpoint,
      height,
      insets,
      setAppearance,
      theme,
      themeName,
      width,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const StyleProvider = ThemeProvider;
