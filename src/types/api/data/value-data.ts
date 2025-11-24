import { ValueTypes } from "./value-types";

/**
 * Describes a singular value of type { @see ValueTypes } used to compose a { @see SnakData }
 */
export interface ValueData {
  value: string | null;
  context: string | null;
  type: ValueTypes | string;
}
