/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #union #string

  ### Question

  Implement the String to Union type. Type take string argument. The output should be a union of input letters

  For example

  ```ts
  type Test = "123"
  type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
  ```

  > View on GitHub: https://tsch.js.org/531
*/

/* _____________ Your Code Here _____________ */

// type StringToUnion<T extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<
    Equal<
      StringToUnion<'coronavirus'>,
      'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'
    >
  >,
]

/* _____________ Your Code _____________ */

type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never

/* _____________ Points _____________ */
// 1. template literal types (`${infer F}${infer R}`) is useful to handle string types
// 2. To create union type, can guess that final type form will be `F | R`
// Then we have to call `StringToUnion` recursively to handle `R` type.
// So, the final type will be `F | StringToUnion<R>`
//
