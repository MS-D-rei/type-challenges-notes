type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // number

type NameOrAlive = "name" | "alive";
type PersonNameOrAlive = Person[NameOrAlive]; // string | boolean

// use `number` to get the type of an array element
const users = [
  { name: "Max Mustermann", age: 25 },
  { name: "Jane Doe", age: 32 },
  { name: "John Doe", age: 40 },
];
type User = (typeof users)[number]; // {name: string, age: number}
type UserAge = (typeof users)[number]["age"]; // number
