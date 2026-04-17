const typescriptQuestions = [
  {
    text: 'What is the difference between `interface` and `type` in TypeScript?',
    options: [
      'They are completely identical — just different syntax',
      '`interface` is for objects only and can be extended/merged; `type` is more flexible and supports unions, intersections, and primitives',
      '`type` can only describe primitive types; `interface` handles everything else',
      '`interface` supports generics; `type` does not',
    ],
    answer: 1,
    explanation:
      '`interface` is declaration-mergeable and best suited for object shapes. `type` aliases can describe unions (`A | B`), intersections (`A & B`), tuples, mapped types, and conditionals. In practice, prefer `interface` for public API shapes and `type` for complex compositions.',
  },
  {
    text: 'What does the `unknown` type mean, and how does it differ from `any`?',
    options: [
      '`unknown` and `any` are identical — both disable type checking',
      '`unknown` is a typed `any` — you can assign anything to it, but must narrow the type before using it',
      '`unknown` only accepts `null` and `undefined`',
      '`any` requires explicit narrowing; `unknown` does not',
    ],
    answer: 1,
    explanation:
      '`any` disables the type system entirely — you can call methods, access properties, and assign freely. `unknown` is the type-safe counterpart: you can store any value, but TypeScript forces you to narrow (e.g., `typeof`, `instanceof`, or a type guard) before performing any operation on it.',
  },
  {
    text: 'What is the `never` type used for in TypeScript?',
    options: [
      'A value that is always `undefined`',
      'A placeholder type for unfinished code',
      'The type of values that can never occur — used for exhaustive checks and functions that never return',
      'An alias for `void`',
    ],
    answer: 2,
    explanation:
      '`never` represents values that cannot exist. A function that always throws or runs an infinite loop returns `never`. It is also the result of a narrowing branch that is unreachable. It is used in exhaustive `switch` checks: assigning the checked value to `never` at the default branch causes a compile error if a new case is not handled.',
  },
  {
    text: 'What are generics in TypeScript, and why are they useful?',
    options: [
      'A way to write comments that describe types',
      'Type parameters that let you write reusable code that works with multiple types while preserving type safety',
      'A runtime feature that checks types at execution time',
      'Special syntax for importing type definitions',
    ],
    answer: 1,
    explanation:
      'Generics are parameterized types — `function identity<T>(x: T): T`. They let you write one function, class, or interface that works with many types without losing type information. Unlike `any`, the relationship between input and output types is preserved, so callers get accurate type inference.',
  },
  {
    text: 'What is a union type, and how do you narrow it?',
    options: [
      'A type that combines all properties of two types into one object',
      'A type that means a value can be one of several types; narrowed via `typeof`, `instanceof`, or discriminant properties',
      'A type that is always `string | number`',
      'A special array type that accepts mixed element types',
    ],
    answer: 1,
    explanation:
      'A union `A | B` means the value is either A or B. You narrow with `typeof` (for primitives), `instanceof` (for classes), or a discriminant/tag property on object unions. After narrowing inside an `if` block, TypeScript treats the value as the narrowed type for the rest of that branch.',
  },
  {
    text: 'What is an intersection type (`A & B`) in TypeScript?',
    options: [
      'A type that can be either A or B',
      'A type that must satisfy both A and B simultaneously — combining all their properties',
      'A type that returns the common properties of A and B only',
      'A conditional type that picks A when B is true',
    ],
    answer: 1,
    explanation:
      'An intersection `A & B` requires the value to have all properties of both A and B. It is commonly used to merge object types: `type AdminUser = User & Admin`. If the combined properties conflict (e.g., `string & number`), the result is `never`.',
  },
  {
    text: 'What does `keyof` do in TypeScript?',
    options: [
      'Returns an array of an object\'s keys at runtime',
      'Produces a union of all known public property names of a type',
      'Checks if an object has a given key',
      'Extracts the value types of an object',
    ],
    answer: 1,
    explanation:
      '`keyof T` produces a string/number union of all public keys of type `T`. For example, `keyof { a: number; b: string }` is `"a" | "b"`. It is heavily used in generic utilities like `Pick<T, K extends keyof T>` to ensure K is a valid key of T.',
  },
  {
    text: 'What is the difference between `Partial<T>` and `Required<T>`?',
    options: [
      '`Partial<T>` removes all properties; `Required<T>` adds new ones',
      '`Partial<T>` makes all properties optional; `Required<T>` makes all properties required',
      'They are inverses of `Readonly<T>`',
      '`Partial<T>` is only for arrays; `Required<T>` is for objects',
    ],
    answer: 1,
    explanation:
      '`Partial<T>` maps every property to optional (`?`), useful for update payloads. `Required<T>` removes all `?` modifiers, making every property mandatory. Both are built-in mapped types in TypeScript\'s standard library.',
  },
  {
    text: 'What does `Pick<T, K>` do?',
    options: [
      'Removes properties K from type T',
      'Creates a new type with only the properties K from T',
      'Makes properties K optional in T',
      'Picks the first K properties from a tuple type T',
    ],
    answer: 1,
    explanation:
      '`Pick<T, K extends keyof T>` constructs a new type containing only the keys in K taken from T. For example, `Pick<User, "id" | "email">` gives you a type with just `id` and `email`. Its counterpart `Omit<T, K>` keeps everything except K.',
  },
  {
    text: 'What is `Record<K, V>` used for?',
    options: [
      'Creating an array of key-value tuples',
      'Constructing an object type with keys of type K and values of type V',
      'Logging key-value pairs at runtime',
      'Defining an enum with string values',
    ],
    answer: 1,
    explanation:
      '`Record<K extends keyof any, V>` is shorthand for a mapped type `{ [P in K]: V }`. Common uses: `Record<string, number>` for a dictionary, or `Record<"success" | "error", string>` to enforce that all keys are present. It is cleaner than an index signature when the key set is known.',
  },
  {
    text: 'What is a type guard in TypeScript?',
    options: [
      'A decorator that validates types at runtime',
      'A conditional expression that tells the compiler a value is a specific type within a scope',
      'A built-in function that converts `unknown` to `any`',
      'A utility type that removes `null` from a union',
    ],
    answer: 1,
    explanation:
      'A type guard narrows the type of a variable inside a conditional block. User-defined type guards return `value is Type` and let you write custom narrowing logic (e.g., `function isString(x: unknown): x is string { return typeof x === "string"; }`). TypeScript recognizes `typeof`, `instanceof`, `in`, and equality checks as built-in type guards.',
  },
  {
    text: 'What is the purpose of the `as const` assertion?',
    options: [
      'It casts a value to `const` type at runtime',
      'It tells TypeScript to infer the narrowest literal types for a value and make all properties readonly',
      'It is an alias for `Object.freeze()`',
      'It prevents a variable from being reassigned',
    ],
    answer: 1,
    explanation:
      'Without `as const`, TypeScript widens string literals to `string`. With `as const`, `{ status: "active" }` is typed as `{ readonly status: "active" }` — the literal "active" is preserved, not widened. This is essential when defining constant maps or lookup objects you want to use as types.',
  },
  {
    text: 'What is a mapped type in TypeScript?',
    options: [
      'A type produced by the `Array.map()` method',
      'A type that iterates over the keys of another type to produce a new type with transformed properties',
      'A utility function for transforming objects at runtime',
      'A type that maps strings to numbers',
    ],
    answer: 1,
    explanation:
      'Mapped types use `{ [K in SomeUnion]: ... }` syntax to iterate over keys and define new types. All built-in utilities (`Partial`, `Readonly`, `Record`) are mapped types. You can add modifiers (`+?`, `-?`, `+readonly`, `-readonly`) to add or remove optional/readonly modifiers on each property.',
  },
  {
    text: 'What is a conditional type in TypeScript?',
    options: [
      'An `if/else` statement inside a type declaration',
      'A type expression of the form `T extends U ? X : Y` — resolves to X or Y depending on whether T is assignable to U',
      'A type that changes based on runtime conditions',
      'A union type that conditionally includes members',
    ],
    answer: 1,
    explanation:
      '`T extends U ? X : Y` works like a ternary for types. When combined with `infer`, it is very powerful — e.g., `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never`. Conditional types also distribute over union members when applied to a bare type parameter.',
  },
  {
    text: 'What does the `infer` keyword do in TypeScript?',
    options: [
      'It tells TypeScript to infer a variable\'s type automatically',
      'It declares a type variable inside a conditional type that TypeScript fills in during type resolution',
      'It is an alias for the `typeof` operator',
      'It forces TypeScript to use explicit type annotations',
    ],
    answer: 1,
    explanation:
      '`infer` can only appear inside a conditional type\'s `extends` clause. It lets TypeScript capture and name a sub-type during matching. For example: `type Awaited<T> = T extends Promise<infer U> ? U : T` extracts the resolved type of a Promise without you having to specify it.',
  },
  {
    text: 'What is declaration merging in TypeScript?',
    options: [
      'Combining multiple `.ts` files into one output file',
      'TypeScript automatically merges multiple declarations of the same name (interfaces, namespaces) into a single definition',
      'A Webpack feature for bundling type definitions',
      'Merging a type alias and an interface into one',
    ],
    answer: 1,
    explanation:
      'When two or more `interface` declarations share the same name, TypeScript merges them into one type with all their properties. This is the basis for module augmentation — you can extend third-party types (e.g., `Express.Request`) by re-declaring the interface. `type` aliases do not merge; redeclaring them is an error.',
  },
  {
    text: 'What is the `satisfies` operator introduced in TypeScript 4.9?',
    options: [
      'A type assertion that widens a type to a supertype',
      'An operator that validates an expression against a type without changing the inferred type of the expression',
      'A replacement for `as` that throws at runtime if the type is wrong',
      'A keyword that marks a class as implementing an interface',
    ],
    answer: 1,
    explanation:
      '`expr satisfies T` checks that the expression is assignable to T but keeps the original, narrower inferred type — unlike `as T` which replaces the type. For example, `const palette = { red: [255,0,0], blue: "#0000ff" } satisfies Record<string, string | number[]>` lets you safely call `.toUpperCase()` on `palette.blue` because TypeScript still knows it is a `string`.',
  },
  {
    text: 'What are template literal types in TypeScript?',
    options: [
      'A way to write multiline strings in type annotations',
      'Types constructed by embedding type variables inside template literal syntax to produce string union types',
      'A runtime string interpolation feature with type safety',
      'A method to define string enums',
    ],
    answer: 1,
    explanation:
      'Template literal types embed type variables inside backtick syntax. For example, a type like EventName maps a string T to "on" + Capitalize<T>. Applied to "click" | "focus", it yields "onClick" | "onFocus". Used in advanced pattern matching and typed event systems.',
  },
  {
    text: 'What is the `NonNullable<T>` utility type?',
    options: [
      'A type that adds `null` and `undefined` to T',
      'A type that removes `null` and `undefined` from T',
      'A type guard function that asserts a value is not null',
      'An alias for `Required<T>`',
    ],
    answer: 1,
    explanation:
      '`NonNullable<T>` is equivalent to `T extends null | undefined ? never : T`. It strips `null` and `undefined` from a union — `NonNullable<string | null | undefined>` becomes `string`. Useful when you have a type that may be nullable and you want a version that is guaranteed to have a value.',
  },
  {
    text: 'What does `strictNullChecks` do in `tsconfig.json`?',
    options: [
      'Prevents variables from being assigned to `null` entirely',
      'Makes `null` and `undefined` distinct types — they are no longer assignable to every type by default',
      'Enables runtime null checking',
      'Removes the need for optional chaining (`?.`)',
    ],
    answer: 1,
    explanation:
      'Without `strictNullChecks`, `null` and `undefined` are subtypes of every type, so you can assign `null` to a `string` variable silently. With it enabled (part of `strict: true`), `null` and `undefined` are their own types and must be explicitly included in unions (`string | null`) or handled before use. This catches the most common source of runtime errors.',
  },
];

export default typescriptQuestions;
