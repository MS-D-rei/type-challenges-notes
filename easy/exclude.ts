// Question

// Implement MyExclude<T, U> which excludes U from T.

// For example

// type T0 = MyExclude<"a" | "b" | "c", "a">; // "b" | "c"

/* _____________ Your Code Here _____________ */

// type MyExclude<T, U> = any
type MyExclude<T, U> = T extends U ? never : T

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<Equal<MyExclude<string | number | (() => void), () => void>, string | number>>
];

/* _____________ Answer _____________ */

