// Question

// Implement MyAwaited<T>, which takes in a type T that is wrapped in a Promise,
// and returns the type T.

// For example

// type ExampleType = Promise<string>
// type Result = MyAwaited<ExampleType>  // expected to be `string`

/* _____________ Your Code Here _____________ */

// type MyAwaited<T> = any;

/* _____________ Test Cases _____________ */

import { Equal, Expect } from "../utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

/* _____________ Answer _____________ */

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;
