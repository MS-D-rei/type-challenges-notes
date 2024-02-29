/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #math #template-literal

  ### Question

  Implement the `Absolute` type. A type that take string, number or bigint. The output should be a positive number string

  For example

  ```ts
  type Test = -100
  type Result = Absolute<Test> // expected to be "100"
  ```

  > View on GitHub: https://tsch.js.org/529
*/

/* _____________ Your Code Here _____________ */

// type Absolute<T extends number | string | bigint> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

/* _____________ Your Code _____________ */

// type Absolute<T extends number | string | bigint> =
//   ConvertToString<T> extends `-${infer _}`
//     ? RemoveBigIntSuffix<RemoveNegativeSign<ConvertToString<T>>>
//     : ConvertToString<T>

// 1. convert T to string
// T extends number | bigint ? `${T}` : T
type ConvertToString<T> = T extends number | bigint ? `${T}` : T
// 2. remove the negative sign if it exists
// T extends `-${infer N}` ? N : T
type RemoveNegativeSign<T> = T extends `-${infer N}` ? N : T
// 3. remove bigint suffix if it exists
// T extends `${infer A}n` ? A : T
type RemoveBigIntSuffix<T> = T extends `${infer A}n` ? A : T

// bigint 100n with `${T}` will be "100", not "100n"
type CheckBigIntSuffix<T extends number | string | bigint> =
  `${T}` extends `${infer A}n` ? A : false
type TestBigIntSuffix = CheckBigIntSuffix<100n> // false
type CheckBigIntSuffix2<T extends number | string | bigint> = `${T}`
type TestBigIntSuffix2 = CheckBigIntSuffix2<100n> // "100"

// No need to use RemoveBigIntSuffix
// type Absolute<T extends number | string | bigint> = RemoveNegativeSign<ConvertToString<T>>

// Another Clean Solution
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}`
  ? U
  : `${T}`
