/*
  949 - AnyOf
  -------
  by null (@kynefuk) #medium #array

  ### Question

  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

  For example:

  ```ts
  type Sample1 = AnyOf<[1, "", false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, "", false, [], {}]> // expected to be false.
  ```

  > View on GitHub: https://tsch.js.org/949
*/

/* _____________ Your Code Here _____________ */

// type AnyOf<T extends readonly any[]> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

/* _____________ Your Code Here _____________ */

// type AnyOf<T extends readonly unknown[]> = T extends [infer F, ...infer R]
//   ? F extends Falsy
//     ? AnyOf<R>
//     : true
//   : false

type Falsy =
  | false
  | ''
  | 0
  | undefined
  | null
  | { [key: string]: never }
  | []
  | 0n

type TestAnyOf1 = AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>

type FirstElement<T extends any[]> = T extends [infer F, ...infer _] ? F : never
type FirstElementTestArray1 = FirstElement<[1, 'test', true, [1]]>
type IsFalsy<T> = T extends Falsy ? true : false
type TestIsFalsy1 = IsFalsy<FirstElementTestArray1>

// Another solution
type AnyOf<T extends readonly unknown[]> = T[number] extends Falsy
  ? false
  : true

/* _____________ Points _____________ */
// - What is falsy type in TypeScript?
// false, '', 0, 0n, null, undefined, NaN
//
// - How define `{}` as falsy type?
// => { [key: string]: never }
