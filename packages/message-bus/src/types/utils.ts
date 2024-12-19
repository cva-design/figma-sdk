/**
 * A union type of all possible values of type T
 */
export type SomeValueOf<T> = T[keyof T];
export type SomeObject = Record<string, unknown>;
export type AutocompleteString = string | number | symbol;

export type { JsonObject } from 'type-fest';
