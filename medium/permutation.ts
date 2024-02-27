/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #medium #union

  ### Question

  Implement permutation type that transforms union types into the array that includes permutations of unions.

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > View on GitHub: https://tsch.js.org/296
*/

/* _____________ Your Code Here _____________ */

// type Permutation<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

/* _____________ Your Code Here _____________ */

type Permutation<T, Origin = T> = [T] extends [never]
  ? []
  : T extends T
    ? [T, ...Permutation<MyExclude<Origin, T>>]
    : never

type UnionABC = 'A' | 'B' | 'C'
type UnionACB = 'A' | 'C' | 'B'
type UnionBAC = 'B' | 'A' | 'C'
type UnionBCA = 'B' | 'C' | 'A'
type UnionCAB = 'C' | 'A' | 'B'
type UnionCBA = 'C' | 'B' | 'A'

type TupleABC = ['A', 'B', 'C']
type TupleACB = ['A', 'C', 'B']
type TupleBAC = ['B', 'A', 'C']
type TupleBCA = ['B', 'C', 'A']
type TupleCAB = ['C', 'A', 'B']
type TupleCBA = ['C', 'B', 'A']

type MyExclude<T, U> = T extends U ? never : T
type MyPick<T, K extends keyof T> = {
  [P in K]: MyExclude<T, P>
}

type KeyOfUnionABC = keyof UnionABC
type KeyOfTupleABC = keyof TupleABC

// Iteration case A
type ExcludeAFromABC = MyExclude<UnionABC, 'A'>
type ArrayExcludeAFromABC = [ExcludeAFromABC]
type SpreadArrayExcludeAFromABC = ['A', ...ArrayExcludeAFromABC]
// A => B
type ExcludeBFromBC = MyExclude<ExcludeAFromABC, 'B'>
type ArrayExcludeBFromBC = [ExcludeBFromBC]
type SpreadArrayExcludeBFromBC = ['A', 'B', ...ArrayExcludeBFromBC]
type ExcludeCFromC = MyExclude<ExcludeBFromBC, 'C'>
type ArrayExcludeCFromC = [ExcludeCFromC]
type SpreadArrayExcludeCFromC = ['A', 'B', 'C', ...ArrayExcludeCFromC]
// A => C
type ExcludeCFromBC = MyExclude<ExcludeAFromABC, 'C'>
type ArrayExcludeCFromBC = [ExcludeCFromBC]
type SpreadArrayExcludeCFromBC = ['A', 'C', ...ArrayExcludeCFromBC]
type ExcludeBFromB = MyExclude<ExcludeCFromBC, 'B'>
type ArrayExcludeBFromB = [ExcludeBFromB]
type SpreadArrayExcludeBFromB = ['A', 'C', 'B', ...ArrayExcludeBFromB]

// Iteration case boolean
type ExcludeFalseFromBoolean = MyExclude<boolean, false>
