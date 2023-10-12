# type-challenges notes
URL: https://github.com/type-challenges/type-challenges

## Easy

### Pick
URL: https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md
```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Explanation

interface UserInfo {
  name: string;
  age: number;
}
type keyofValue = keyof UserInfo;
// => type keyofValue = "name" | "age"

type name = "firstname" | "lastname";
type TName = {
  [key in name]: string;
};
// => type TName = { firstname: string; lastname: string; }
```

### Readonly
URL: https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md
```ts
type MyReadonly<T> = { readonly [P in keyof T]: T[P] }

// can't write like [P in [K extends keyof T]: T[P]]
```

### Tuple to Object
```ts
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P;
};

// points

// 1. how to write union type array
// (string | number | symbol)[]

// 2. how to write index signature
// [P in T[number]]: P;
```
