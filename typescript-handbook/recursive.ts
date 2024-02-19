// Recursive conditional types
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types

type ElementType<T> = T extends ReadonlyArray<infer U> ? ElementType<U> : T;

function deepFlatten<T extends readonly any[]>(arr: T): ElementType<T>[] {
  // const result: ElementType<T>[] = []
  // for (const value of arr) {
  //   if (Array.isArray(value)) {
  //     result.push(...deepFlatten(value))
  //   } else {
  //     result.push(value)
  //   }
  // }
  // return result
  throw "Not implemented";
}

const array1 = [1, 2, [3, 4, [5, 6]]] as const;
type Array1Type = typeof array1;
type FlattenArray1Type = ElementType<Array1Type>; // expected to be '1 | 2 | 3 | 4 | 5 | 6'

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
declare function customThen<T, U>(
  promise: Promise<T>,
  onfulfilled: (value: Awaited<T>) => U,
): Promise<Awaited<U>>;
