import { Dispatch, SetStateAction } from "react";
import { ManagedStateValue } from "./managed-state-value";

/**
 * Abstract interface containing the default methods used by the {@link P5_ManagedState} class.
 * Bridges state management between P5 & React allowing state from P5 to be emitted to subscribing components.
 */
/**
 * Abstract class representing a state manager.
 * @template T - The type of the state object.
 */
export abstract class StateManager<T> {
  protected state: Map<string, ManagedStateValue<any>> = new Map();
  /**
   * Initializes a state value with a given key and initial value.
   * @template K - The key of the state value.
   * @param {K} key - The key of the state value.
   * @param {T[K]} initialValue - The initial value of the state.
   */
  protected initializeState<K extends keyof T>(key: K, initialValue: T[K]) {
    this.state.set(key.toString(), {
      value: initialValue,
      subscribers: [],
    });
  }

  /**
   * Notifies all subscribers of a state value change.
   * @template K - The key of the state value.
   * @param {K} key - The key of the state value.
   * @param {T[K]} newValue - The new value of the state.
   */
  protected notifySubscribers<K extends keyof T>(key: K, newValue: T[K]) {
    const state = this.state.get(key.toString());
    if (state) {
      state.value = newValue;
      state.subscribers.forEach(subscriber => subscriber(newValue));
    }
  }

  /**
   * Adds a subscriber to a state value.
   * @template K - The key of the state value.
   * @param {K} key - The key of the state value.
   * @param {Dispatch<SetStateAction<T[K]>>} setter - The subscriber function to be called when the state value changes.
   */
  protected addSubscriber<K extends keyof T>(
    key: K,
    setter: Dispatch<SetStateAction<T[K]>>
  ) {
    const state = this.state.get(key.toString());
    if (state) {
      state.subscribers.push(setter);
    }
  }

  /**
   * Retrieves the current value of a state.
   * @template K - The key of the state value.
   * @param {K} key - The key of the state value.
   * @returns {T[K]} - The current value of the state.
   */
  protected getValue<K extends keyof T>(key: K): T[K] {
    const state = this.state.get(key.toString());
    return state?.value as T[K];
  }
}
