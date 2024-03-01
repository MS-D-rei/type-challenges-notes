/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

// type Diff<O, O1> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

/* _____________ Your Code Here _____________ */

// My first solution
// type Diff<T, U> = MySpread<MyOmit<T, U> & MyOmit<U, T>>
type DiffTest1 = Diff<Foo, Bar> // {gender: number}

// MyOmit to use omit keyof K from T
type MyOmit<T, K> = {
  [P in keyof T as P extends keyof K ? never : P]: T[P]
}

// To get the diff keys of T and U,
// I use MyOmit<T, U> and MyOmit<U, T> and then merge them.
type MyOmitTest1 = MyOmit<Foo, Bar> // {}
type MyOmitTest2 = MyOmit<Bar, Foo> // {gender: number}
type MyOmitTest3 = MyOmit<Foo, Bar> & MyOmit<Bar, Foo> // {} & {gender: number}
// To spread merged object, I use MySpread.
type MySpread<T> = { [P in keyof T]: T[P] }
type MySpreadTest1 = MySpread<MyOmitTest3> // {gender: number}

// Another solution
// how to use keyof `|` and `&`.
type GetMutualKeys<T, U> = keyof (T | U)
type GetMutualKeysTest1 = GetMutualKeys<Foo, Bar> // 'name' | 'age'
type GetAllKeys<T, U> = keyof (T & U)
type GetAllKeysTest1 = GetAllKeys<Foo, Bar> // 'name' | 'age' | 'gender'

type Diff<T, U> = Omit<T & U, keyof (T | U)>
