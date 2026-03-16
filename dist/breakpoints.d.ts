export declare const defaultBreakpoints: {
    readonly xs: 0;
    readonly sm: 376;
    readonly md: 768;
    readonly lg: 992;
    readonly xl: 1200;
};
export type Breakpoints = typeof defaultBreakpoints;
export type Breakpoint = keyof Breakpoints;
export declare const getBreakpointForWidth: (width: number, breakpoints?: Breakpoints) => Breakpoint;
export declare const breakpoints: {
    readonly xs: 0;
    readonly sm: 376;
    readonly md: 768;
    readonly lg: 992;
    readonly xl: 1200;
};
