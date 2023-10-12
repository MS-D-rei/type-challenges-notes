// type-challenges
// https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.md

import { Expect, Equal } from "../index";

// write code

// type TupleToObject<T extends readonly any[]> = any;

// must pass all tests

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const sym1 = Symbol(1);
const sym2 = Symbol(2);
const tupleSymbol = [sym1, sym2] as const;
const tupleMix = [1, "2", 3, "4", sym1] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<
      TupleToObject<typeof tupleSymbol>,
      { [sym1]: typeof sym1; [sym2]: typeof sym2 }
    >
  >,
  Expect<
    Equal<
      TupleToObject<typeof tupleMix>,
      { 1: 1; "2": "2"; 3: 3; "4": "4"; [sym1]: typeof sym1 }
    >
  >,
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

// answer

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P;
};

// points

// 1. how to write union type array
// (string | number | symbol)[]

// 2. how to write index signature
// [P in T[number]]: P;
