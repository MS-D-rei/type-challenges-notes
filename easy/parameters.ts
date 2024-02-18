// Implement the built-in Parameters<T> generic without using it.

// For example

// const foo = (arg1: string, arg2: number): void => {}
// type footype = typeof foo // (arg1: string, arg2: number) => void
// type fooParameters = Parameters<footype> // [string, number]
// type FunctionParamsType = MyParameters<typeof foo> // [string, number]

/* _____________ Your Code Here _____________ */

// type MyParameters<T extends (...args: any[]) => any> = any[]; 

/* _____________ Test Cases _____________ */

import { Equal, Expect } from "../utils";

const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

/* _____________ Answer _____________ */

type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
