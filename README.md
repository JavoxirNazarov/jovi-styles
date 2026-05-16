# jovi-styles

Portable React Native theming package extracted from the Gagra app.

It ships the original Gagra token set, light/dark themes, responsive breakpoints, screen helpers, and the `createStylesheet` / `useStyles` pattern used in the app.

## Install

```bash
yarn add jovi-styles
```

Or with npm:

```bash
npm install jovi-styles
```

Peer dependencies expected in your app:

- `react`
- `react-native`
- `react-native-safe-area-context`

## Usage

```tsx
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ThemeProvider,
  createStylesheet,
  useAppearance,
  useStyles,
} from "jovi-styles";

const themeStorage = {
  getItem: (key: string) => AsyncStorage.getItem(key),
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
};

const stylesheet = createStylesheet(({ theme }) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.color.background,
    padding: theme.spacing[5],
  },
}));

function Screen() {
  const { styles } = useStyles(stylesheet);
  const { appearance, setAppearance } = useAppearance();

  return null;
}

export function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider storage={themeStorage}>
        <Screen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

If you do not wrap your app with `SafeAreaProvider`, `insets` will gracefully fall back to `0`.

## TypeScript Theme Overrides

If your app adds custom tokens on top of the built-in theme, extend the exported `Theme` interface from a root-level `global.d.ts`.

```ts
// global.d.ts
import "jovi-styles";

declare module "jovi-styles" {
  interface Theme {
    custom: {
      brandGradient: [string, string];
      tabBarHeight: number;
    };
  }
}

export {};
```

Then your overrides and hooks will automatically see the extra fields:

```ts
import { ThemeProvider, darkTheme, lightTheme, useTheme } from "jovi-styles";

const themes = {
  light: {
    ...lightTheme,
    custom: {
      brandGradient: ["#F0E8D5", "#C1A050"],
      tabBarHeight: 64,
    },
  },
  dark: {
    ...darkTheme,
    custom: {
      brandGradient: ["#4D4020", "#261F0F"],
      tabBarHeight: 64,
    },
  },
};

function Screen() {
  const theme = useTheme();

  theme.custom.brandGradient;
  theme.custom.tabBarHeight;

  return null;
}

<ThemeProvider themes={themes}>
  <Screen />
</ThemeProvider>;
```

Notes:

- `global.d.ts` should be included by your app's `tsconfig.json`.
- Your custom fields are merged onto the built-in theme shape, so default tokens like `theme.color.background` remain typed.
- If you want to validate individual override objects explicitly, you can annotate them as `Theme`.

## API

### Provider

```tsx
<ThemeProvider
  defaultAppearance="auto"
  storage={themeStorage}
  storageKey="preferredTheme"
  themes={{
    light: lightTheme,
    dark: darkTheme,
  }}
/>
```

### Hooks

- `useTheme()` returns the active theme object.
- `useThemeName()` returns `'light'` or `'dark'`.
- `useAppearance()` returns `{ appearance, setAppearance, isHydrated }`.
- `useBreakpoint()` returns one of `xs | sm | md | lg | xl`.
- `useStyles(stylesheet)` returns `{ styles, ctx }`.

### Exports

- `lightTheme`, `darkTheme`, `defaultThemes`
- `spacing`, `radius`, `borderWidth`
- `breakpoints`, `getBreakpointForWidth`
- `getAdaptiveWidth`, `getAdaptiveHeight`
- `ThemeProvider` and `StyleProvider` (alias for easy migration)
- `ThemeContext` and `StyleContext`

## Notes

- The package keeps the original Gagra color tokens and spacing scale intact.
- The old Gagra MMKV dependency was intentionally removed. Pass your own storage adapter from each app.
- The original text component and font-family decisions were left out on purpose, since those are usually app branding rather than shared theming infrastructure.
