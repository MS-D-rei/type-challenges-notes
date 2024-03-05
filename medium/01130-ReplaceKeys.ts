/*
  1130 - ReplaceKeys
  -------
  by 贱贱 (@lullabyjune) #medium #object-keys

  ### Question

  Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
  A type takes three arguments.

  For example:

  ```ts
  type NodeA = {
    type: "A"
    name: string
    flag: number
  }

  type NodeB = {
    type: "B"
    id: number
    flag: number
  }

  type NodeC = {
    type: "C"
    name: string
    flag: number
  }

  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<
    Nodes,
    "name" | "flag",
    { name: number; flag: string }
  > // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
  ```

  > View on GitHub: https://tsch.js.org/1130
*/

/* _____________ Your Code Here _____________ */

// type ReplaceKeys<U, T, Y> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<
    Equal<
      ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>,
      ReplacedNodes
    >
  >,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]

/* _____________ Further Steps _____________ */

// Original solution
type ReplaceKeys<U, T, Y> = U extends infer UItem
  ? {
      [P in keyof UItem]: P extends T
        ? P extends keyof Y
          ? Y[P]
          : never
        : UItem[P]
    }
  : never

// 1. Handle union type one by one
// => U extends infer UItem ? ... : never
//
// 2. Resulted type keys
// => { [P in keyof UItem] : Value }
//
// 3. This `Value` depends on that the `P` extends `T` or not
// => P extends T ? ... : UItem[P]
//
// 4. If `P` extends `T`, but `Y` has no `P` key, then the value type should be `never`
// => P extends keyof Y ? Y[P] : never

// Another solution
// type ReplaceKeys<U, T, Y> = {
//   [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P]
// }
