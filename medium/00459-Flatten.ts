/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array

  ### Question

  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

  For example:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

// type Flatten = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
      [{ foo: 'bar'; 2: 10 }, 'foobar']
    >
  >,
]

// @ts-expect-error
type error = Flatten<'1'>

/* _____________ Your Code _____________ */

type Flatten<T extends unknown[]> = T extends [infer F, ...infer R]
  ? F extends [infer A, ...infer B]
    ? [...Flatten<F>, ...Flatten<R>]
    : [F, ...Flatten<R>]
  : []

// Another solution
// type Flatten<T extends unknown[]> = T extends [infer F, ...infer R]
//   ? [...(F extends unknown[] ? Flatten<F> : [F]), ...Flatten<R>]
//   : []

// Flatten must handle tuple types, not array types.
const NumberArray = [[1, 2], 3, 4]
type NumberArray = typeof NumberArray
type SpreadNumberArray = [...NumberArray, ...NumberArray] // (number | number[])[]

type NumberTuple = [[1, 2], 3, 4]
type NumberTuple2 = [1, [2]]
type ConcatNumberTuple1And2 = [...NumberTuple, ...NumberTuple2] // [[1, 2], 3, 4, 1, [2]]

// extends [infer F, ...infer R] can be used as tuple type check.
type FirstElement<T extends unknown[]> = T extends [infer F, ...infer _]
  ? F
  : []
type RestElement<T extends unknown[]> = T extends [infer _, ...infer R] ? R : []
type NumberTupleFirst = FirstElement<[[1, 2], 3]> // [1, 2]
type NumberTupleRest = RestElement<[[1, 2], 3]> // [3]
type SpreadNumberTuple = [...NumberTupleFirst, ...NumberTupleRest] // [1, 2, 3]

// To use recursive conditional types, 
// we need to create a final type form as one case of the conditional type. 
// So we need to use infer F and infer R both to create a final type form.
// ex. [...Flatten<F>, ...Flatten<R>], [F, ...Flatten<R>]

// Where we can use recursive conditional types?
// => If we find the same use case from an abstruct perspective,
// we can use recursive conditional types.
// ex. Flatten<TupleType> = TupleType extends [infer F, ...infer R]
// if F is a tuple type and we need to flatten F, we can use Flatten<F>.
// and R is too. So we can use Flatten<R>.
// Thus, one final type form is [...Flatten<F>, ...Flatten<R>].
