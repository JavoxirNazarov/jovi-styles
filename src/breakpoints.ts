export const defaultBreakpoints = {
  xs: 0,
  sm: 376,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

export type Breakpoints = typeof defaultBreakpoints;
export type Breakpoint = keyof Breakpoints;

export const getBreakpointForWidth = (
  width: number,
  breakpoints: Breakpoints = defaultBreakpoints,
): Breakpoint => {
  const sortedEntries = Object.entries(breakpoints).sort(([, a], [, b]) => b - a);

  for (const [name, value] of sortedEntries) {
    if (width >= value) {
      return name as Breakpoint;
    }
  }

  return 'xs';
};

export const breakpoints = defaultBreakpoints;
