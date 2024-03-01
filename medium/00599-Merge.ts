/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  For example

  ```ts
  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
  ```

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

// type Merge<F, S> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number
        b: number
        c: boolean
      }
    >
  >,
]

/* _____________ Your Code _____________ */

type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? S[P]
    : P extends keyof F
      ? F[P]
      : never
}

type Spread<T> = { [P in keyof T]: T[P] }
type TestFoo = Spread<Foo> // {a: number, b: string}
type TestBar = Spread<Bar> // {b: number, c: boolean}
type Merge2<F, S> = Spread<F & S>
// I'm not sure why Test1 has b: never
type Test1 = Merge2<Foo, Bar>
// {a: number, b: never, c: boolean}

// Another Solution
// type Merge<F extends Record<string, any>, S extends Record<string, any>> = {
//   [P in keyof (F & S)]: P extends keyof S ? S[P] : (F & S)[P]
// }

type Test2 = Merge<Foo, Bar>
