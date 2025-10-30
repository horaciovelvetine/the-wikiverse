import { ValueTypes } from "./value-types";

/**
 * Describes a singular value of type { @see ValueTypes } used to compose a { @see SnakData }
 */
export interface ValueData {
  value: string;
  context: string;
  type: ValueTypes | string;
}
