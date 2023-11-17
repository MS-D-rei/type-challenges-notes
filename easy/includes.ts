// Question

// Implement the JavaScript 'Array.includes' in the type system.
// A type takes the two arguments.
// The output should be a boolean true or false.

// For example
// type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`

/* _____________ Your Code Here _____________ */

// type Includes<T extends readonly any[], U> = any;

/* _____________ Test Cases _____________ */

import { Equal, Expect } from "../utils";

type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
];

/* _____________ Answer _____________ */

// https://github.com/type-challenges/type-challenges/issues/1568

// type Includes<T extends readonly any[], U> = {
//   [K in T[number]]: true;
// }[U] extends true
//   ? true
//   : false;

type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false;

type Includes<Value extends any[], Item> = IsEqual<Value[0], Item> extends true
  ? true
  : Value extends [Value[0], ...infer rest]
  ? Includes<rest, Item>
  : false;
