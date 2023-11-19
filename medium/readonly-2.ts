/*
 * Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.
 * `K` specify the set of properties of `T` that should set to Readonly. 
 * When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.
 * 
 * For example
 *
 * interface Todo {
 *  title: string
 *  description: string
 *  completed: boolean
 * }
 *
 * const todo: MyReadonly2<Todo, 'title' | 'description'> = {
 *  title: "Hey",
 *  description: "foobar",
 *  completed: false,
 * }
 *
 * todo.title = "Hello" // Error: cannot reassign a readonly property
 * todo.description = "barFoo" // Error: cannot reassign a readonly property
 * todo.completed = true // OK
*/

/* _____________ Your Code Here _____________ */

// type MyReadonly2<T, K> = any;

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '../utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ Answer _____________ */

type MyExclude<T, U> = T extends U ? never : T

type MyReadonly2<T, K extends keyof T> = { readonly [P in keyof T as P extends K ? P : never]: T[P] } & { [U in MyExclude<keyof T, K>]: T[U] }

// type MyReadonly2<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

type todo1 = MyReadonly2<Todo1, 'title' | 'description'>

/* _____________ Points _____________ */

// How to use '&' to combine two types
// How to use 'as' to filter properties
// => P in keyof T as P extends K ? P : never
