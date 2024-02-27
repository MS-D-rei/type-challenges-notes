/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal

  ### Question

  Compute the length of a string literal, which behaves like `String#length`.

  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

// type LengthOfString<S extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ Your Code Here _____________ */

type LengthOfString<S extends string> = ConvertStringToArray<S>['length']

type ConvertStringToArray<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...ConvertStringToArray<R>] // tuple type
  : []

type TestConvertStringToArray = ConvertStringToArray<'abcd'>
type LengthOfTestConvertStringToArray = TestConvertStringToArray['length'] // 4

type TestLengthOfString = LengthOfString<'abcd'>

/* _____________ Points _____________ */
// - How to get concrete number from string?
// => tuple type can be used to get the length of string.
const abcdString = 'abcd' // string type
type NumberOfAbcdString = (typeof abcdString)['length'] // number, not 4.
const abcdArray = ['a', 'b', 'c', 'd'] // array type
type NumberOfAbcdArray = (typeof abcdArray)['length'] // number, not 4.
const abcdArrayAsConst = ['a', 'b', 'c', 'd'] as const // tuple type
type NumberOfAbcdArrayAsConst = (typeof abcdArrayAsConst)['length'] // 4
