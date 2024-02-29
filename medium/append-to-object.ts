/*
  527 - Append to object
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #object-keys

  ### Question

  Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field.

  For example

  ```ts
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
  ```

  > View on GitHub: https://tsch.js.org/527
*/

/* _____________ Your Code Here _____________ */

// type AppendToObject<T, U, V> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
]

/* _____________ Your Code _____________ */

// type AppendToObject<T, K extends string, V> = T extends object
//   ? { [P in keyof T | K]: P extends keyof T ? T[P] : V }
//   : never

// 1. Spread object type
type SpreadObject<T> = T extends object ? { [K in keyof T]: T[K] } : never
type SpreadTest1 = SpreadObject<test1> // { key: 'cat', value: 'green' }

// 2. Add new field to the object somehow
type SpreadObjectAndNewField<T, S extends string, V> = T extends object
  ? { [P in keyof T]: T[P] } & { [K in S]: V }
  : never
type SpreadTest1AndNewField = SpreadObjectAndNewField<test1, 'home', boolean>
// { key: 'cat', value: 'green'} & { home: boolean }
// => This does not work as expected because the new field is not added to the object.
// `&` operator does not add a new field to the object.

// 3. Use conditional type to add a new field to the object
// 3.1 Key side: [P in keyof T | K] => Property in keyof T or K
// 3.2 Value side: P extends keyof T ? T[P] : V => If P is in keyof T, then T[P], otherwise V
type AddNewFieldToObject<T, K extends string, V> = T extends object
  ? { [P in keyof T | K]: P extends keyof T ? T[P] : V }
  : never
type AddNewFieldTest1 = AddNewFieldToObject<test1, 'home', boolean>
// { key: 'cat', value: 'green', home: boolean }

// Another solution
// use `&` to create a new argument type.
type AppendToObject<T, K extends string, V> = T extends object
  ? SpreadObject<T & Record<K, V>>
  : never
