// Question

// Implement MyExclude<T, U> which excludes U from T.

// For example

// type T0 = MyExclude<"a" | "b" | "c", "a">; // "b" | "c"

/* _____________ Your Code Here _____________ */

// type MyExclude<T, U> = any

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<Equal<MyExclude<string | number | (() => void), () => void>, string | number>>
];

/* _____________ Answer _____________ */

// Distributive conditional types
// => if T is a union type, then T extends U ? X : Y is resolved for each constituent type of T
type MyExclude<T, U> = T extends U ? never : T;
