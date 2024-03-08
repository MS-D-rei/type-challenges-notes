/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer

  ### Question

  Drop a specified char from a string.

  For example:

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > View on GitHub: https://tsch.js.org/2070
*/

/* _____________ Your Code Here _____________ */

// type DropChar<S, C> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

/* _____________ Your Code _____________ */

// type DropChar<S, C> = S extends `${infer F}${infer R}`
//   ? F extends C
//     ? `${DropChar<R, C>}`
//     : `${F}${DropChar<R, C>}`
//   : ''

// Another Solution
type DropChar<S, C extends string> = S extends `${infer F}${C}${infer R}`
  ? DropChar<`${F}${R}`, C>
  : S

// type DropChar<S, C extends string> = S extends `${infer F}${C}${infer R}`
//   ? C extends ''
//     ? S
//     : DropChar<`${F}${R}`, C>
//   : S
