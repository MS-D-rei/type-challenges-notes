/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #union #utils

  ### Question

  Implement a type IsNever, which takes input type `T`.
  If the type of resolves to `never`, return `true`, otherwise `false`.

  For example:

  ```ts
  type A = IsNever<never> // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/1042
*/

/* _____________ Your Code Here _____________ */

// type IsNever<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

/* _____________ Your Code Here _____________ */

type IsNever<T> = [T] extends [never] ? true : false

type TestIsNever = IsNever<never> // expected to be true

/* _____________ Points _____________ */
// [T] extends [never]
// https://github.com/type-challenges/type-challenges/issues/614
// TypeScript treats never as an empty union when distributing over conditionals.
//
function assertNever<T>(value: T extends never ? true : false): void {}
// Error: Type 'true' is not assignable to type 'false'.
// assertNever<string>(true) // working as expected
// Error: Argument of type 'boolean' is not assignable to parameter of type 'never'. [2345]
// assertNever<never>(true) // => why parameter of type `never`?
// => TypeScript treats never as an empty union when distributing over conditionals.
// And TypeScript simply ignores the empty union.
// As a result, `T extends never` does not work.

// How we force TypeScript to evaluate `T` before distributing over conditionals?
// 1. [T] extends [never] ? true : false
function assertNeverTuple<T>(value: [T] extends [never] ? true : false): void {}
// 2. T[] extends never[] ? true : false
function assertNeverArray<T>(value: T[] extends never[] ? true : false): void {}

assertNeverTuple<never>(true) // working as expected
assertNeverArray<never>(true) // working as expected
