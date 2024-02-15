interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string; // number
type Example2 = RegExp extends Animal ? number : string; // string

// Conditional types
// Sometype extends OtherType ? TrueType : FalseType;

interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}
// function overloads with mutiple call signatures
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

// function overloads with single line with conditional type
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabelWithCondition<T extends number | string>(
  idOrName: T,
): NameOrId<T> {
  throw "unimplemented";
}
let typescriptLabel = createLabelWithCondition("typescript");
let numberLabel = createLabelWithCondition(2);
let randomLabel = createLabelWithCondition(Math.random() ? "hello" : 42);

// Conditional Type Constraints
type messageOf<T> = T extends { message: unknown } ? T["message"] : never;
interface Email {
  message: string;
}
type EmailMessageContents = messageOf<Email>; // string
type DogMessageContents = messageOf<Dog>; // never

type Flatten<T> = T extends any[] ? T[number] : T;
type Str = Flatten<string[]>;
type Num = Flatten<number>;

// Inferring Within Conditional Types
// `infer` keyword is used to infer the type of a type parameter
// Like `auto` in C++
type FlattenInfer<T> = T extends Array<infer U> ? U : T;
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type NumReturnType = GetReturnType<() => number>; // number
type StrReturnType = GetReturnType<(str: string) => string>; // string
type BoolReturnType = GetReturnType<(a: boolean, b: boolean) => boolean>; // boolean

// Inferences are made from the last signature (which, presumably, is the most permissive catch-all case)
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
type T1 = ReturnType<typeof stringOrNum>; // string | number

// Distributive Conditional Types
// Distributive conditional types are automatically distributed over union types during instantiation.
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type ArrOfStrOrNum = ToArrayNonDist<string | number>; // (string | number)[]
