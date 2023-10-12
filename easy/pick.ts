import { Equal, Expect } from "../index";

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
// type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type MyPick<T, K> = any;

// must pass the tests below

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">,
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

// Answer
// type MyPick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// Explanation

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
