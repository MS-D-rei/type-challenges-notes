/*
  1978 - Percentage Parser
  -------
  by SSShuai1999 (@SSShuai1999) #medium #template-literal

  ### Question

  Implement PercentageParser<T extends string>.
  According to the `/^(\+|\-)?(\d*)?(\%)?$/` regularity to match T and get three matches.

  The structure should be: [`plus or minus`, `number`, `unit`]
  If it is not captured, the default is an empty string.

  For example:

  ```ts
  type PString1 = ""
  type PString2 = "+85%"
  type PString3 = "-85%"
  type PString4 = "85%"
  type PString5 = "85"

  type R1 = PercentageParser<PString1> // expected ['', '', '']
  type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
  type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
  type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
  type R5 = PercentageParser<PString5> // expected ["", "85", ""]
  ```

  > View on GitHub: https://tsch.js.org/1978
*/

/* _____________ Your Code Here _____________ */

// type PercentageParser<A extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]

/* _____________ Your Code Here _____________ */

type PercentageParser<T extends string> =
  T extends `${CheckPrefix<infer F>}${infer R}`
    ? [F, ...CheckSuffix<R>]
    : ['', ...CheckSuffix<T>]

// 1. Get first char
// T extends `${infer F}${infer R}` ? F : ''
// 2. if first char is '+' or '-', [first char, ...R], else ['', ...T]
// F extends `+` | `-` ? [F, ...R] : ['', ...T]
type CheckPrefix<F extends string> = F extends `+` | `-` ? F : never
// 3. if R has '%', [...R, '%'], else [...R, '']
// R extends `${infer S}%` ? [...R, '%'] : [...R, '']
type CheckSuffix<R extends string> = R extends `${infer S}%`
  ? [S, '%']
  : [R, '']

// type PercentageParser<T extends string> = T extends `${infer F}${infer R}`
//   ? F extends `+` | `-`
//     ? [F, ...CheckSuffix<R>]
//     : ['', ...CheckSuffix<T>]
//   : ['', '', '']

type Test1 = PercentageParser<''> // expected ['', '', '']
type Test2 = PercentageParser<'+'> // expected ['+', '', '']
type Test3 = PercentageParser<'+1'> // expected ['+', '1', '']
type Test4 = PercentageParser<'+100'> // expected ['+', '100', '']
type Test5 = PercentageParser<'+100%'> // expected ['+', '100', '%']
type Test6 = PercentageParser<'100%'> // expected ['', '100', '%']
type Test7 = PercentageParser<'-100%'> // expected ['-', '100', '%']
type Test8 = PercentageParser<'-100'> // expected ['-', '100', '']
type Test9 = PercentageParser<'-1'> // expected ['-', '1', '']
type Test10 = PercentageParser<'%'> // expected ['', '', '%']
type Test11 = PercentageParser<'1'> // expected ['', '1', '']
type Test12 = PercentageParser<'100'> // expected ['', '100', '']

type TestCheckSuffix1 = CheckSuffix<'100%'> // true
type TestCheckSuffix2 = CheckSuffix<'100'> // false
type TestCheckSuffix3 = CheckSuffix<'%'> // true
type TestCheckSuffix4 = CheckSuffix<'1'> // false

// Another Solution
type ConvertPrefix<T extends string> = T extends `${infer F}${infer R}`
  ? F extends '+' | '-'
    ? F
    : ''
  : ''
type ConvertSuffix<T extends string> = T extends `${infer F}${infer R}%`
  ? '%'
  : T extends '%'
    ? '%'
    : ''
type ExtractNumber<T extends string> = T extends `${infer F}${infer R}`
  ? F extends '+' | '-'
    ? R extends `${infer N}%`
      ? N
      : R
    : T extends `${infer N}%`
      ? N
      : T
  : ''
// type PercentageParser<T extends string> = [
//   ConvertPrefix<T>,
//   ExtractNumber<T>,
//   ConvertSuffix<T>,
// ]

type TestConvertSuffix1 = ConvertSuffix<'100%'> // expected to be '%'
type TestConvertSuffix2 = ConvertSuffix<'100'> // expected to be ''
type TestConvertSuffix3 = ConvertSuffix<'%'> // expected to be '%'
