type OptionFlags<T> = {
  [P in keyof T]: boolean;
};

type Features = {
  darkmode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionFlags<Features>;

// Mappting Modifiers
type CreateMutable<T> = {
  -readonly [P in keyof T]: T[P];
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;

type Concrete<T> = {
  [P in keyof T]-?: T[P];
};
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
type ConcreteUser = Concrete<MaybeUser>;

// Key Remapping via `as`
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;

type RemoveKindField<T> = {
  [P in keyof T as Exclude<P, "kind">]: T[P];
};
interface Circle {
  kind: "circle";
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;

type EventConfig<Events extends { kind: string }> = {
  [E in Events as `on${Capitalize<E["kind"]>}`]: (event: E) => void;
};
type SquareEvent = { kind: "square"; sideLength: number };
type CircleEvent = { kind: "circle"; radius: number };
type ShapeEvents = SquareEvent | CircleEvent;
type ShapeEventHandlers = EventConfig<ShapeEvents>;

// With conditional types
type ExtractPII<T> = {
  [P in keyof T]: T[P] extends { pii: true } ? true : false;
};
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// General Data Protection Regulation (GDPR) is a regulation in EU law 
// on data protection and privacy in the European Union and the European Economic Area.
