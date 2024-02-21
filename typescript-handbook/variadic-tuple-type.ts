// Variadic Tuple Types
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types
// typescript-4-0 changes

// The first change is that spreads in tuple type syntax can now be generic. This means that we can represent higher-order operations on tuples and arrays even when we don’t know the actual types we’re operating over. 
// When generic spreads are instantiated (or, replaced with a real type) in these tuple types, they can produce other sets of array and tuple types.

function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr;
  return rest;
}

const tuple1 = [1, 2, 3, 4] as const;
const array1 = ["hello", "world"];

const r1 = tail(tuple1); // expected to be [2, 3, 4]
const r2 = tail([...tuple1, ...array1]); // expected to be [2, 3, 4, ...string[]]

// The second change is that rest elements can occur anywhere in a tuple - not just at the end!
type StringTuple = [string, string];
type NumberTuple = [number, number];
type StringNumberBoolTuple = [...StringTuple, ...NumberTuple, boolean]; // expected to be [string, string, number, number, boolean]
// => Previously, TypeScript would issue an error like the following:
// "A rest element must be last in a tuple type."

// if we don't know the length of the tuple or array,
// the result type will have unbounded type in the middle like ...number[]
type NumberArray = number[]; // length is not known
type UnboundedTuple = [...StringTuple, ...NumberArray, boolean]; // expected to be [string, string, ...number[], boolean]

// `concat` function
function concat<T extends readonly any[], U extends readonly any[]>(arr1: T, arr2: U): [...T, ...U] {
  return [...arr1, ...arr2];
}

function partialCall<T extends unknown[], U extends unknown[], R>(
  f: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs);
}
const foo1 = (x: string, y: number, z: boolean) => {};
// const partialFoo1 = partialCall(foo1, 100); // Argument of type '100' is not assignable to parameter of type 'string'
// const partialFoo2 = partialCall(foo1, "hello", 100, true, "world"); // expected 4 arguments, but got 5
const partialFoo3 = partialCall(foo1, "hello");
const callPartialFoo3 = partialFoo3(100, true);
