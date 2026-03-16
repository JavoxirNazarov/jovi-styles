"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakpoints = exports.getBreakpointForWidth = exports.defaultBreakpoints = void 0;
exports.defaultBreakpoints = {
    xs: 0,
    sm: 376,
    md: 768,
    lg: 992,
    xl: 1200,
};
const getBreakpointForWidth = (width, breakpoints = exports.defaultBreakpoints) => {
    const sortedEntries = Object.entries(breakpoints).sort(([, a], [, b]) => b - a);
    for (const [name, value] of sortedEntries) {
        if (width >= value) {
            return name;
        }
    }
    return 'xs';
};
exports.getBreakpointForWidth = getBreakpointForWidth;
exports.breakpoints = exports.defaultBreakpoints;
