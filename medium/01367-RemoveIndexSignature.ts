/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

// type RemoveIndexSignature<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<T> = {
  [P in keyof T as string extends P
    ? never
    : number extends P
      ? never
      : symbol extends P
        ? never
        : P]: T[P]
}

// Another Solution
// type RemoveIndexSignature<T, PK = PropertyKey> = {
//   [P in keyof T as PK extends P ? never : (P extends PK ? P : never)]: T[P]
// }

type TestRemoveIndexSignature = RemoveIndexSignature<Foo>

/* _____________ Points _____________ */
// - The difference between normal property and index signature.
// in case of normal property, property key has a concrete type, literal type.
// in case of index signature, property key has a not concrete type, string | number | symbol.
// ex.
// type Baz = { bar(): void; baz: string } // intellisense shows `baz`, not `[key: string]`
// type Foo = { [key: string]: any; foo(): void } // intellisense shows `[key: string]`, not `key`
//
// - How to distinguish literal type and the other type.
type TestStringExtends1 = string extends 'foo' ? true : false // false
type TestStringExtends2 = 'foo' extends string ? true : false // true
// if string extends P is true, P is not literal type

// This way doesn't work
// type RemoveIndexSignature<T> = {
//   [P in keyof T as (string | number | symbol) extends P ? never : P]: T[P]
// }

// Another Solution
// PropertyKey is a union type of string, number, and symbol.
// type RemoveIndexSignature<T, PK = PropertyKey> = {
//   [P in keyof T as PK extends P ? never : P extends PK ? P : never]: T[P]
// }
