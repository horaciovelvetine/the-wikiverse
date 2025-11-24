import { SnakData } from "./snak-data";
import { SnakGroupData } from "./snak-group-data";

/**
 * Structure which summarizes the information of a Claim made about a { @see VertexData }
 */
export interface ClaimData {
  main: SnakData;
  qualifiers: SnakGroupData[];
}
