/*
  62 - Type Lookup
  -------
  by Anthony Fu (@antfu) #medium #union #map

  ### Question

  Sometimes, you may want to look up a type in a union by its attributes.

  In this challenge, we would like to get the corresponding type by searching for the common `type` field 
  in the union `Cat | Dog`. In other words, we will expect to get `Dog` for `LookUp<Dog | Cat, 'dog'>` 
  and `Cat` for `LookUp<Dog | Cat, 'cat'>` in the following example.

  ```ts
  interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }

  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }

  type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
  ```

  > View on GitHub: https://tsch.js.org/62
*/

/* _____________ Your Code Here _____________ */

// type LookUp<U, T> = any;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>,
  Expect<Equal<LookUp<Animal, "cat">, Cat>>,
];

/* _____________ Your Code Here _____________ */

// 1. simple solution
type LookUp<U, T> = U extends { type: T } ? U : never;
// type LookUp<U extends { type: string }, T extends U["type"]> = U extends { type: T } ? U : never;

// 2. This U["type"] doesn't work as distribution type
// type LookUp<U extends { type: string }, T extends U["type"]> = U["type"] extends T ? U : never;
//
// This works as distribution type
// type LookUp<U, T> = U extends U ? U["type"] extends T ? U : never : never;

// 3. Intentionally make an object type and access it.
// type LookUp<U, T extends string> = { [K in T]: U extends { type: T } ? U : never }[T];
// const dogString = "dog";
// type DogString = typeof dogString; // "dog"
// type DogObject = { [K in DogString]: K }; // { dog: "dog" }
// type DogObjectAccess = DogObject[DogString]; // "dog"

type DogTest = Dog["type"]; // "dog"
type catTest = Cat["type"]; // "cat"
type MyDogType = LookUp<Animal, "dog">; // expected to be `Dog`
type MyCatType = LookUp<Animal, "cat">; // expected to be `Cat`
