import type { Keyframes } from "#/@types/style";

import { TransformError } from "ammolite/errors/transform";

/**
 * Create a keyframes.
 *
 * ### Example
 *
 * ```ts
 * import { keyframes } from "lyngurium";
 *
 * const fadeIn = keyframes({
 *     "0%": {
 *         opacity: 0,
 *     },
 *     "100%": {
 *         opacity: 1,
 *     },
 * });
 * ```
 */
const keyframes = (_keyframes: Keyframes): string => {
    throw new TransformError("keyframes");
};

export { keyframes };
