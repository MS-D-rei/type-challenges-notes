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


// https://github.com/microsoft/TypeScript/pull/39094

// Type relationships
/*
Generally, a tuple type S is related to a tuple type T by pairwise relating elements of S to the elements of T. Variadic elements are processed as follows:
- A variadic element ...U in S is related to a variadic element ...V in T if U is related to V.
- A variadic element ...U in S is related to a rest element ...X[] in T if U is related to X[].
*/
function relationship1<T extends unknown[], U extends T>(x: [string, ...unknown[]], y: [string, ...T], z: [string, ...U]) {
  x = y;
  x = z;
  // y = x; // Error
  y = z; // assignable because U extends T
  // z = x; // Error
  // z = y; // Error
}
/*
Tuple types with single variadic elements have the following relations:
- [...T] is related to T.
- T is related to readonly [...T].
- T is related to [...T] when T is constrained to a mutable array or tuple type.
*/
function relationship2<T extends readonly unknown[]>(t: T, m: [...T], r: readonly [...T]) {
  t = m;
  // t = r; // Error
  // m = t; // Error readonly cannot be assigned to mutable
  // m = r; // Error readonly cannot be assigned to mutable
  r = t;
  r = m; // mutable can be assigned to readonly
}

// Type inference
type First<T extends readonly unknown[]> = T[0];
type DropFirst<T extends readonly unknown[]> = T extends readonly [unknown?, ...infer U] ? U : [...T];  
type Last<T extends readonly unknown[]> =
  T extends readonly [...infer _, infer U] ? U :
  T extends readonly [...infer _, (infer U)?] ? U | undefined :
  undefined;
type DropLast <T extends readonly unknown[]> = T extends readonly [...infer U, unknown?] ? U : [...T];

type InferenceFirst = First<[number, string, boolean]>; // number
type InferenceDropFirst = DropFirst<[number, string, boolean]>; // [string, boolean]
type InferenceLast = Last<[number, string, boolean]>; // boolean
type InferenceDropLast = DropLast<[number, string, boolean]>; // [number, string]

// Spread in array literals
// when a spread occurs in an array literal,
// it is processed as a variadic element in the resulting tuple type
// [10, true] will be [number, boolean],
// so [1, ...T, 2, ...U, 3] as const will be [1, string, 2, number, boolean, 3] as const
function spreadArray<T extends unknown[], U extends unknown[]>(t: [...T], u: [...U]) {
  return [1, ...t, 2, ...u, 3] as const;
}
const spreadArrayResult = spreadArray(["hello"], [10, true]); 
// expected to be readonly [1, string, 2, number, boolean, 3]
// not [1, "hello", 2, 10, true, 3]

declare function spreadArray1<T extends unknown[]>(t: T): T;
declare function spreadArray2<T extends unknown[]>(t: T): readonly [...T];
declare function spreadArray3<T extends unknown[]>(t: [...T]): T;
declare function spreadArray4<T extends unknown[]>(t: [...T]): readonly [...T];

const spreadArray1Result = spreadArray1(["hello", 42]); // expected to be (string | number)[]
const spreadArray2Result = spreadArray2(["hello", 42]); // expected to be readonly (string | number)[]
const spreadArray3Result = spreadArray3(["hello", 42]); // expected to be [string, number]
const spreadArray4Result = spreadArray4(["hello", 42]); // expected to be readonly [string, number]

const testArray10 = ["hello", 42];
type TestArray10 = typeof testArray10; // expected to be (string | number)[]
/**
 * Represents a tuple type that spreads the elements of `TestArray10`.
 * The expected type is [string, number].
 */
type SpreadArray10 = [...TestArray10]; // expected to be [string, number]
type SpreadArray10Boolean = [...TestArray10, boolean]; // expected to be [string, number, boolean]

// Indexing
function indexing1<T extends unknown[]>(t: [string, ...T], n: number) {
  const a = t[0]; // string
  const b = t[1]; // [string, ...T][1]
  const c = t[2]; // [string, ...T][2]
  const d = t[n]; // [string, ...T][number]
};

function indexing2<T extends unknown[]>(t: [string, ...T, number], n: number) {
  const a = t[0]; // string
  const b = t[1]; // [string, ...T, number][1]
  const c = t[2]; // [string, ...T, number][2]
  const d = t[n]; // [string, ...T, number][number]
}

// Destructuring
function destructuring1<T extends unknown[]>(t: [string, ...T]) {
  const [...an] = t; // [string, ...T]
  const [b1, ...bn] = t; // string, [...T]
  const [c1, c2, ...cn] = t; // string, [string, ...T][1], T[number][]
} 

function destructuring2<T extends unknown[]>(t: [string, ...T, number]) {
  const [...an] = t; // [string, ...T, number]
  const [b1, ...bn] = t; // string, [...T, number]
  const [c1, c2, ...cn] = t; // string, [...T, number][1], (number | T[number])[]
}

// Rest parameters and Spread arguments

declare function spreadArgs1(a: number, b: string, c: boolean, ...d: number[]): void;

function spreadArgs2(t1: [number, string], t2: [boolean], a1: number[]) {
  spreadArgs1(1, 'abc', true, 42, 43, 44);
  spreadArgs1(...t1, true, ...a1);
  spreadArgs1(...t1, ...t2, ...a1);
  // spreadArgs1(...t1); // Error: expected 3 arguments, but got 2
  // spreadArgs1(...t1, 45); // Error: number is not assignable to boolean
}

declare function restParams1<T extends unknown[]>(x: number, ...args: [...T, number]): T;

function restParams2<U extends unknown[]>(u: U) {
  restParams1(1, 2); // expected to be []
  restParams1(1, "hello", true, 2); // expected to be [string, boolean]
  restParams1(1, ...u, "hi", 2); // expected to be [...U, string]
}
