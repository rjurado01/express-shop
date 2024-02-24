import {NeverHereError} from './errors/never-here.error'

export class Ok<T> {
  readonly value: T

  constructor(value: T) {
    this.value = value
  }
}

export type Nothing = undefined
export const Nothing = undefined

// https://www.reddit.com/r/typescript/comments/y8yisq/make_parameter_optional_on_generic_type_condition/
// export class Ok<T = undefined> {
//   readonly value: T

//   constructor(value?: T) {
//     if (value) this.value = value
//   }
// }

export function neverHere(_result: never) {
  throw new NeverHereError()
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined
}

export function isObject(val: unknown): val is object {
  return typeof val === 'object' && val !== null
}

export function ensureType<T>(val: T) {
  return val
}
