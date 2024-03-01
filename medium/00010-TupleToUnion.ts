// https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.md
/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #medium #infer #tuple #union

  ### Question

  Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.

  For example

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > View on GitHub: https://tsch.js.org/10
*/

/* _____________ Your Code Here _____________ */

// type TupleToUnion<T> = any;
type TupleToUnion<T extends (string | number | boolean)[]> = T[number];
// type TupleToUnion<T> = T extends Array<infer I> ? I : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
];
