const javascriptQuestions = [
  {
    text: 'What is the output of `typeof null` in JavaScript?',
    options: ['"null"', '"undefined"', '"object"', '"string"'],
    answer: 2,
    explanation:
      '`typeof null` returns "object" — this is a long-standing bug in JavaScript that was never fixed to preserve backward compatibility.',
  },
  {
    text: 'Which of the following correctly describes a closure?',
    options: [
      'A function that runs immediately after being declared',
      'A function that retains access to its outer scope after the outer function has returned',
      'A function with no return value',
      'A function that can only be called once',
    ],
    answer: 1,
    explanation:
      'A closure is a function that remembers the variables from its lexical scope even when executed outside that scope.',
  },
  {
    text: 'What does `Array.prototype.reduce` return when called on an empty array without an initial value?',
    options: ['0', 'undefined', 'null', 'Throws a TypeError'],
    answer: 3,
    explanation:
      'Calling reduce on an empty array with no initial value throws a TypeError: "Reduce of empty array with no initial value".',
  },
  {
    text: 'What is event delegation?',
    options: [
      'Attaching an event listener to every child element',
      'Attaching a single event listener to a parent element to handle events from its children',
      'Preventing an event from bubbling up the DOM',
      'Using setTimeout to delay event handling',
    ],
    answer: 1,
    explanation:
      'Event delegation leverages event bubbling by attaching one listener to a parent element, then checking the event target to handle child interactions efficiently.',
  },
  {
    text: 'What is the difference between `==` and `===` in JavaScript?',
    options: [
      'No difference — they are the same',
      '`==` checks value only; `===` checks value and type',
      '`===` checks value only; `==` checks value and type',
      '`==` is for numbers; `===` is for strings',
    ],
    answer: 1,
    explanation:
      '`==` performs type coercion before comparison, while `===` (strict equality) compares both value and type without coercion.',
  },
];

export default javascriptQuestions;
