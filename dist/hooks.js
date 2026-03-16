"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppearance = exports.useBreakpoint = exports.useThemeName = exports.useTheme = exports.createStylesheet = exports.useStyleProvider = exports.useThemeContext = void 0;
exports.useStyles = useStyles;
const react_1 = require("react");
const context_1 = require("./context");
const useThemeContext = () => {
    const context = (0, react_1.useContext)(context_1.ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
exports.useThemeContext = useThemeContext;
exports.useStyleProvider = exports.useThemeContext;
const createStylesheet = (styleFunction) => styleFunction;
exports.createStylesheet = createStylesheet;
function useStyles(styleFunction) {
    const context = (0, exports.useThemeContext)();
    const styles = (0, react_1.useMemo)(() => {
        var _a;
        return (_a = styleFunction === null || styleFunction === void 0 ? void 0 : styleFunction(context)) !== null && _a !== void 0 ? _a : {};
    }, [context, styleFunction]);
    return (0, react_1.useMemo)(() => ({ styles, ctx: context }), [styles, context]);
}
const useTheme = () => (0, exports.useThemeContext)().theme;
exports.useTheme = useTheme;
const useThemeName = () => (0, exports.useThemeContext)().themeName;
exports.useThemeName = useThemeName;
const useBreakpoint = () => (0, exports.useThemeContext)().breakpoint;
exports.useBreakpoint = useBreakpoint;
const useAppearance = () => {
    const { appearance, setAppearance } = (0, exports.useThemeContext)();
    return {
        appearance,
        setAppearance,
    };
};
exports.useAppearance = useAppearance;
