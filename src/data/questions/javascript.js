const javascriptQuestions = [
  {
    text: 'What is the output of `typeof null` in JavaScript?',
    options: ['"null"', '"undefined"', '"object"', '"string"'],
    answer: 2,
    explanation:
      '`typeof null` returns "object" — a long-standing bug in JavaScript never fixed to preserve backward compatibility. Use `=== null` to check for null explicitly.',
  },
  {
    text: 'What is a closure in JavaScript?',
    options: [
      'A function that executes immediately after being defined',
      'A function that retains access to its outer scope variables even after the outer function has returned',
      'A method that closes the browser window',
      'A way to prevent variable mutation',
    ],
    answer: 1,
    explanation:
      'A closure is a function bundled with its lexical environment. It remembers variables from the scope where it was created, even after that outer function has finished executing. Used heavily in data encapsulation, callbacks, and module patterns.',
  },
  {
    text: 'What is the difference between `==` and `===`?',
    options: [
      'No difference',
      '`==` compares value and type; `===` compares value only',
      '`==` coerces types before comparing; `===` compares value and type without coercion',
      '`===` is slower than `==`',
    ],
    answer: 2,
    explanation:
      '`==` (loose equality) performs type coercion — e.g., `"5" == 5` is true. `===` (strict equality) requires both value AND type to match — `"5" === 5` is false. Always prefer `===` to avoid subtle bugs.',
  },
  {
    text: 'What does `Array.prototype.reduce()` return when called on an empty array with no initial value?',
    options: ['0', 'undefined', 'null', 'Throws a TypeError'],
    answer: 3,
    explanation:
      'Calling `reduce()` on an empty array without an initial value throws `TypeError: Reduce of empty array with no initial value`. Always provide an initial value when the array might be empty.',
  },
  {
    text: 'What is event delegation?',
    options: [
      'Attaching an event listener to every child element',
      'Using `setTimeout` to delay event handling',
      'Attaching one listener to a parent element to handle events bubbling up from children',
      'Preventing events from firing more than once',
    ],
    answer: 2,
    explanation:
      'Event delegation uses event bubbling — attach a single listener on a parent, then check `event.target` to handle interactions from many children. This is memory-efficient and works for dynamically added elements.',
  },
  {
    text: 'What is the difference between `var`, `let`, and `const`?',
    options: [
      'They are identical — just different syntax styles',
      '`var` is function-scoped and hoisted; `let`/`const` are block-scoped and not hoisted to usable state',
      '`const` values can be reassigned; `let` cannot',
      '`var` is block-scoped; `let` is function-scoped',
    ],
    answer: 1,
    explanation:
      '`var` is function-scoped, hoisted and initialized as `undefined`. `let` and `const` are block-scoped and are hoisted but stay in the Temporal Dead Zone (TDZ) until their declaration. `const` cannot be reassigned but object properties can be mutated.',
  },
  {
    text: 'What is the event loop in JavaScript?',
    options: [
      'A loop that iterates over DOM events',
      'A mechanism that processes the call stack and moves callbacks from the task queue to the stack when the stack is empty',
      'A function that runs every 16ms for animation frames',
      'A way to handle for loops asynchronously',
    ],
    answer: 1,
    explanation:
      'JavaScript is single-threaded. The event loop continuously checks if the call stack is empty, then pulls the next task from the callback queue (macrotasks) or microtask queue (Promises). Microtasks always run before the next macrotask.',
  },
  {
    text: 'What is the difference between `Promise.all()` and `Promise.allSettled()`?',
    options: [
      'They are the same',
      '`Promise.all()` rejects immediately if any promise rejects; `Promise.allSettled()` waits for all and returns all outcomes',
      '`Promise.allSettled()` is faster than `Promise.all()`',
      '`Promise.all()` returns an object; `Promise.allSettled()` returns an array',
    ],
    answer: 1,
    explanation:
      '`Promise.all()` short-circuits on the first rejection — useful when all results are needed and one failure means total failure. `Promise.allSettled()` always waits for every promise and returns `{status, value/reason}` for each — useful for independent operations.',
  },
  {
    text: 'What does the `this` keyword refer to in an arrow function?',
    options: [
      'The arrow function itself',
      'The global object always',
      'It is lexically bound — it inherits `this` from the enclosing scope at definition time',
      'The DOM element that triggered the event',
    ],
    answer: 2,
    explanation:
      'Arrow functions do not have their own `this`. They capture `this` from their surrounding lexical context at definition time. This makes them ideal for callbacks inside class methods, avoiding the need for `.bind(this)` or `const self = this`.',
  },
  {
    text: 'What is prototypal inheritance in JavaScript?',
    options: [
      'A class-based inheritance system identical to Java',
      'Objects inheriting directly from other objects via the prototype chain',
      'A way to copy all methods from one class to another',
      'Inheritance that only works with ES6 classes',
    ],
    answer: 1,
    explanation:
      'In JavaScript, every object has an internal `[[Prototype]]` link to another object. When a property isn\'t found on an object, the engine walks up the prototype chain. ES6 `class` syntax is syntactic sugar over this prototype-based system.',
  },
];

export default javascriptQuestions;
