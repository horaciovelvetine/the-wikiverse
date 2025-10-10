import { WikiverseError } from "../site";

export interface Request {
  recievedAt: string;
  respondedAt: string;
  error: WikiverseError | null;
}
