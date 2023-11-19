// Implement the built-in `Pick<T, K>` generic without using it.

// For example

// interface Todo {
//  title: string;
//  description: string;
//  completed: boolean;
// }

// type TodoPreview = MyPick<Todo, "title" | "completed">;

// const todo: TodoPreview = {
// title: "Clean room",
// completed: false,
// };

/* _____________ Your Code Here _____________ */

// type MyPick<T, K> = any;

/* _____________ Test Cases _____________ */

import { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ Answer _____________ */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/* _____________ Points _____________ */

interface UserInfo {
  name: string;
  age: number;
}
type keyofValue = keyof UserInfo;
// type keyofValue = "name" | "age"

type name = "firstname" | "lastname";
type TName = {
  [key in name]: string;
};
// type TName = { firstname: string; lastname: string; }

function getValue<T extends object, K extends keyof T >(obj: object, key: string): T[K] {
  return obj[key];
}
