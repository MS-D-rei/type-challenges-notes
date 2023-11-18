// Question

// Implement the generic version of 'Array.push'

// For example

// type Result = Push<[1, 2], '3'> // [1, 2, '3']

/* _____________ Your Code Here _____________ */

// type Push<T, U> = any;

/* _____________ Test Cases _____________ */

import { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>,
];

/* _____________ Answer _____________ */

// type Push<T extends any[], U> = [ ...T, U]
type Push<T extends unknown[], U> = [...T, U];

/* _____________ Points _____________ */

// the difference between any and unknown
// https://typescriptbook.jp/reference/statements/any-vs-unknown

/*
 * unknown type is safer than any type
 * because unknown type can't be assigned to other type
 * and doesn't allow to call methods and properties of unknown type
 * */
