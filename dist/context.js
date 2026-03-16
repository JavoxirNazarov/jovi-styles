"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleProvider = exports.ThemeProvider = exports.ThemeContext = exports.DEFAULT_THEME_STORAGE_KEY = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const breakpoints_1 = require("./breakpoints");
exports.DEFAULT_THEME_STORAGE_KEY = "preferredTheme";
exports.ThemeContext = (0, react_1.createContext)(null);
const useAdaptiveTheme = ({ storage, storageKey, defaultTheme = "light", }) => {
    const colorScheme = (0, react_native_1.useColorScheme)();
    const [appearance, setAppearance] = (0, react_1.useState)(() => {
        var _a;
        const savedTheme = (_a = storage.getItem(storageKey)) !== null && _a !== void 0 ? _a : "auto";
        return savedTheme;
    });
    const handleSetAppearance = (0, react_1.useCallback)((val) => {
        setAppearance(val);
        storage.setItem(storageKey, val);
    }, [storage, storageKey]);
    const themeName = (appearance === "auto" ? (colorScheme !== null && colorScheme !== void 0 ? colorScheme : defaultTheme) : appearance);
    return { themeName, setAppearance: handleSetAppearance, appearance };
};
const ThemeProvider = ({ children, defaultTheme, storage, storageKey = exports.DEFAULT_THEME_STORAGE_KEY, theming, breakpoints = breakpoints_1.breakpoints, }) => {
    const { width, height } = (0, react_native_1.useWindowDimensions)();
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    if (!storage) {
        throw new Error("ThemeProvider requires a storage prop to persist theme preference.");
    }
    const { themeName, setAppearance, appearance } = useAdaptiveTheme({
        storage,
        storageKey,
        defaultTheme,
    });
    const theme = (0, react_1.useMemo)(() => {
        var _a, _b;
        const resolvedThemes = {
            light: (_a = theming === null || theming === void 0 ? void 0 : theming.light) !== null && _a !== void 0 ? _a : theming === null || theming === void 0 ? void 0 : theming.dark,
            dark: (_b = theming === null || theming === void 0 ? void 0 : theming.dark) !== null && _b !== void 0 ? _b : theming === null || theming === void 0 ? void 0 : theming.light,
        };
        return themeName === "dark" ? resolvedThemes.dark : resolvedThemes.light;
    }, [theming, themeName]);
    if (!theme) {
        throw new Error("light or dark themes must be provided in the theming prop.");
    }
    const breakpoint = (0, react_1.useMemo)(() => (0, breakpoints_1.getBreakpointForWidth)(width, breakpoints), [width, breakpoints]);
    const contextValue = (0, react_1.useMemo)(() => ({
        theme,
        themeName,
        appearance,
        setAppearance,
        breakpoint,
        screenWidth: width,
        screenHeight: height,
        insets,
    }), [
        appearance,
        breakpoint,
        height,
        insets,
        setAppearance,
        theme,
        themeName,
        width,
    ]);
    return ((0, jsx_runtime_1.jsx)(exports.ThemeContext.Provider, { value: contextValue, children: children }));
};
exports.ThemeProvider = ThemeProvider;
exports.StyleProvider = exports.ThemeProvider;
