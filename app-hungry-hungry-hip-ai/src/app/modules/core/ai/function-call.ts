/**
 * Base interface used to define a common way in the core module how to call a function
 */
export interface IFunctionCall {
  getFunctionName(): string;
}