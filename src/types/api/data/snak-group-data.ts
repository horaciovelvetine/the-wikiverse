import { SnakData } from "./snak-data";
import { ValueData } from "./value-data";

/**
 * Correlated group of { @see SnakData } objects which are related under a shared property ({ @see ValueData })
 */
export interface SnakGroupData {
  snaks: SnakData[];
  property: ValueData | null;
}
