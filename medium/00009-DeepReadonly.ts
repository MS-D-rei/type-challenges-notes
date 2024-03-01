/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep

  ### Question

  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

  For example:

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/9
*/

/* _____________ Your Code Here _____________ */

// type DeepReadonly<T> = any;

/* _____________ Answer _____________ */
// // 1. not pass
// This approach sets object as the criteria for readonly.
// However, it can't distinguish between object and function.
// Becuase, object includes function.
// type DeepReadonly<T> = {
//   readonly [P in keyof T]: T[P] extends object
//     ? DeepReadonly<T[P]>
//     : T[P];
// };
// // 2. pass all the test cases
// type PrimitiveAndFunction = string | number | boolean | Function;
// type DeepReadonly<T> = {
//   readonly [P in keyof T]: T[P] extends PrimitiveAndFunction
//     ? T[P]
//     : DeepReadonly<T[P]>;
// };
// // 3. not pass
// type DeepReadonly<T> = keyof [T] extends never
//   ? T
//   : { readonly [P in keyof T]: DeepReadonly<T[P]>; };
// // 4. pass all the test cases
type DeepReadonly<T> = T extends object
  ? keyof T extends never
    ? T
    : { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

type X1Type = DeepReadonly<X1>;
type X2Type = DeepReadonly<X2>;

const A = () => 22;
type AType = typeof A;
type ATypeReadonly = DeepReadonly<AType>;
const L = ["h1", { m: ["hey"] }];
type LType = typeof L;
type LTypeReadonly = DeepReadonly<LType>;
const M = { m: ["hey"] };
type MType = typeof M;
type MTypeReadonly = DeepReadonly<MType>;

type X2Keys = keyof X2; // never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        },
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        },
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };
