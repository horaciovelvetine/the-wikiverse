import { ValueData } from "./value-data";
import { ValueTypes } from "./value-types";

/**
 * Structural means of defining the details of a { @see ClaimData } comprised of two { @see ValueData }, one for the property and one for the actual value. Lastly includes a datatype attribute to describe the type of data being described by the snak.
 */
export interface SnakData {
  property: ValueData | null;
  value: ValueData | null;
  datatype: ValueTypes | null | string;
}
