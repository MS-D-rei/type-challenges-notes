// type-challenges - README.md
// https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md
// typescript handbook
// https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#readonly-and-const

import { Equal, Expect } from "../utils";

interface Todo {
  title: string;
  description: string;
}

const todo: Readonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property

// make own readonly

// type MyReadonly<T> = any;

// must pass
type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

// Answer

type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

// Point

// No need to write like [P in [K extends keyof T]]: T[P]
