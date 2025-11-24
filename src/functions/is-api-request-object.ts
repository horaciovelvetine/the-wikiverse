import { APIRequest } from "../types";

/**
 * Helper type guard to determine if a value is an APIRequest.
 * This allows runtime checks similar to 'instanceof' but for interfaces.
 */
export function isAPIRequestObject(obj: unknown): obj is APIRequest {
  if (typeof obj !== "object" || obj === null) return false;
  const maybe = obj as Partial<APIRequest>;
  return (
    typeof maybe.receivedAt === "string" &&
    typeof maybe.respondedAt === "string" &&
    "error" in maybe && // could be null
    typeof maybe.requestDurationMillis === "number"
  );
}
