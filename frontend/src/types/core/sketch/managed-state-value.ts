import { Dispatch, SetStateAction } from "react";

/**
 * Represents a piece of state maintained across the two application domains: P5 & React. Generic type <T> represents
 * the type of the correlated managed state, the value is the state, and an array of subscribers are the pieces of
 * React state which subscribe to updates to this piece of state.
 */
export interface ManagedStateValue<T> {
  value: T;
  subscribers: Dispatch<SetStateAction<T>>[];
}
