// Question

// Implement the util type If<C, T, F>, which accepts `C`, `T` and `F` three generic types,
// and returns T if C is true, otherwise F.

// For example
// type A = If<true, 'a', 'b'>  // expected to be 'a'
// type B = If<false, 'a', 'b'> // expected to be 'b'

/* _____________ Your Code Here _____________ */

// type If<C, T, F> = any;

/* _____________ Test Cases _____________ */

import { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>
];

// @ts-expect-error
type error = If<null, 'a', 'b'>;

/* _____________ Answer _____________ */

type If<C extends boolean, T, F> = C extends true ? T : F;
