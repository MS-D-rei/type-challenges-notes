// Question

// Implement a generic Length<T> that calculates the length of a tuple.

// For example

// type tesla = ['tesla', 'model 3', 'model X', 'model Y']
// type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

// type teslaLength = Length<tesla>  // expected 4
// type spaceXLength = Length<spaceX> // expected 5

/* _____________ Your Code Here _____________ */

// type Length<T> = any

type Length<T> = T extends { length: infer L } ? L : never
// type Length<T extends readonly any[]> = T['length']

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '../utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

/* _____________ Answer _____________ */

// type Length<T extends any[]> = T['length']

// type Length<T extends any[]> = T extends { length: infer L } ? L : never
