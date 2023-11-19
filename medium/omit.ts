// Implement the built-in `Omit<T, K>` generic without using it.

// For example

// interface Todo {
//  title: string
//  description: string
//  completed: boolean
// }
//
// type TodoPreview = MyOmit<Todo, 'description' | 'title'>
// const todo: TodoPreview = {
// completed: false,
// }

/* _____________ Your Code Here _____________ */

// type MyOmit<T, K> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

/* _____________ Answer _____________ */

// https://github.com/type-challenges/type-challenges/issues/4
// https://github.com/type-challenges/type-challenges/issues/448

type MyExclude<T, U> = T extends U ? never : T

type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P]
}

/* _____________ Points _____________ */

// MyPick<T, K> is similar to MyOmit<T, K>
// MyPick<T, K> = { [P in K]: T[P] }
// MyOmit<T, K> = { [P in MyExclude<keyof T, K>]: T[P] }
