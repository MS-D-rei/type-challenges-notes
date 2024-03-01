/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

// declare function PromiseAll(values: any): any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]

/* _____________ Answer _____________ */

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
})

const promiseAll = PromiseAll([promise1, promise2, promise3] as const) // expected to be `Promise<[number, 42, string]>`

declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [P in keyof T]: T[P] extends Promise<infer R> | infer R ? R : never
}>;

const test1Array = [1, 2, 3] as const;
type Test1 = typeof test1Array;
type SpreadTest1 = [...Test1];
/**
 * This is actually an array type.
 */
type ArrayGeneratedByKeyValuePair = { [K in keyof SpreadTest1]: SpreadTest1[K] };
const test1PromiseAll = PromiseAll([1, 2, 3] as const); // expected to be `Promise<[1, 2, 3]>`
const test1PromiseAll2 = PromiseAll(test1Array); // expected to be `Promise<[1, 2, 3]>`

const test2Array = [1, 2, Promise.resolve(3)] as const;
type Test2 = typeof test2Array;
const test2PromiseAll = PromiseAll(test2Array); // expected to be `Promise<[1, 2, number]>`

const test3Array = [1, 2, Promise.resolve(3)];
type Test3 = typeof test3Array; // expected to be (number | Promise<number>)[]
type KeysTest3 = keyof Test3;
type TypeOfKeysTest3 = Test3[KeysTest3];
type SpreadTest3 = [...Test3]; // expected to be [1, 2, Promise<number>]
type KeysSpreadTest3 = keyof SpreadTest3;
type TypeOfKeysSpreadTest3 = SpreadTest3[KeysSpreadTest3];
const test3PromiseAll = PromiseAll(test3Array); // expected to be `Promise<[number, number, number]>`

const test4Array = [1, 2, 3];
type KeysTest4 = keyof typeof test4Array;
type TypeOfKeysTest4 = typeof test4Array[KeysTest4];
type Test4 = Array<number | Promise<number>>;
type SpreadTest4 = [...Test4];
type KeysSpreadTest4 = keyof SpreadTest4;
const test4PromiseAll = PromiseAll(test4Array); // expected to be `Promise<number[]>`)

/* _____________ Points _____________ */
// - (values: [...T]). Spread operator makes array type to tuple type
// declare function ft1<T extends unknown[]>(t: T): T;
// declare function ft2<T extends unknown[]>(t: T): readonly [...T];
// declare function ft3<T extends unknown[]>(t: [...T]): T;
// declare function ft4<T extends unknown[]>(t: [...T]): readonly [...T];
//
// ft1(['hello', 42]);  // (string | number)[]
// ft2(['hello', 42]);  // readonly (string | number)[]
// ft3(['hello', 42]);  // [string, number]
// ft4(['hello', 42]);  // readonly [string, number]

// - readonly can be used to [...T], not just T.

// - Promise<{ [P in keyof T]: T[P] extends Promise<infer R> | infer R ? R : never }>
// At first, I don't understand why Promise<{}> to make array or tuple type.
// It({a: b}) is object.
// const testArray1 = [1, 2, 3] as const;
// type Test1 = typeof testArray1;
// type SpreadTest1 = [...Test1];
// type ArrayGeneratedByKeyValuePair = { [K in keyof SpreadTest1]: SpreadTest1[K] };
// This `ArrayGeneratedByKeyValuePair` is actually an array.

// - Promise<infer R> | infer R ? R : never
// to remove unused type.
