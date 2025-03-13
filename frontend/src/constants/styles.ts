/**
 * Export values used in styling components where colors or other constants are needed (often time in -impl models which have a draw function in the Sketch)
 * @param alpha - The alpha (opacity) value for the color, as a string.
 * @returns The RGBA color string with the specified alpha value.
 */
//rgba(1,1,14)
export const SKETCH_BG = (alpha: string) => `rgba(1,1,14,${alpha})`;
// rgba(33,37,41)
export const GRAY_100 = (alpha: string) => `rgba(33,37,41,${alpha})`;

// rgba(52,58,64)
export const GRAY_200 = (alpha: string) => `rgba(52,58,64,${alpha})`;

// rgba(73,80,87)
export const GRAY_300 = (alpha: string) => `rgba(73,80,87,${alpha})`;

// rgba(108,117,125)
export const GRAY_400 = (alpha: string) => `rgba(108,117,125,${alpha})`;

// rgba(222,226,230)
export const GRAY_500 = (alpha: string) => `rgba(222,226,230,${alpha})`;

// rgba(248,249,250)
export const WHITE = (alpha: string) => `rgba(248,249,250,${alpha})`;

// rgba(245,62,61)
export const RED = (alpha: string) => `rgba(245,62,61,${alpha})`;

// rgba(241,106,35)
export const ORANGE = (alpha: string) => `rgba(241,106,35,${alpha})`;

// rgba(245,193,68)
export const YELLOW = (alpha: string) => `rgba(245,193,68,${alpha})`;

// rgba(82,195,90)
export const GREEN = (alpha: string) => `rgba(82,195,90,${alpha})`;

// rgba(53,182,210)
export const BRIGHT_BLUE = (alpha: string) => `rgba(53,182,210,${alpha})`;

// rgba(0,122,255)
export const BLUE = (alpha: string) => `rgba(0,122,255,${alpha})`;

// rgba(135,20,255)
export const PURPLE = (alpha: string) => `rgba(135,20,255,${alpha})`;
