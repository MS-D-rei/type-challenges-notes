// Implement the built-in `ReturnType<T>` generic without using it.

// For example

// const fn = (v: boolean) => {
//  if (v)
//  	return 1
//  else
//  	return 2
//  }

// type a = MyReturnType<typeof fn> // should be "1 | 2"

/* _____________ Your Code Here _____________ */

// type MYReturnType<T> = any;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
]

type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2

/* _____________ Answer _____________ */

// URL: https://github.com/type-challenges/type-challenges/issues/2

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

/* _____________ Points _____________ */

// 1. what we need to do is to extract the return type of a function
// extends () => infer R is the return type
// 2. we can use `infer` to infer the type of a generic type
// 3. we can use `extends` to check if a type is a function type
// extends () => infer R ? R : never
