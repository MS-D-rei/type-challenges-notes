/*
  106 - Trim Left
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.

  For example

  ```ts
  type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
  ```

  > View on GitHub: https://tsch.js.org/106
*/

/* _____________ Your Code Here _____________ */

// type TrimLeft<S extends string> = any;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>,
];

/* _____________ Answer _____________ */

// Simple solution
// type Space = " " | "\n" | "\t";
// type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// Another solution
type TrimLeft<S extends string> = S extends `${infer L}${infer R}`
  ? L extends " " | "\n" | "\t"
    ? TrimLeft<R>
    : S
  : S;
