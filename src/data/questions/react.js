const reactQuestions = [
  {
    text: 'What hook would you use to run a side effect after every render?',
    options: ['useState', 'useCallback', 'useEffect', 'useRef'],
    answer: 2,
    explanation:
      '`useEffect` runs after every render by default. Pass a dependency array to control when it re-runs.',
  },
  {
    text: 'What is the purpose of the `key` prop in React lists?',
    options: [
      'It styles the list item',
      'It helps React identify which items changed, were added, or removed',
      'It sets the index of the element',
      'It prevents re-renders',
    ],
    answer: 1,
    explanation:
      'The `key` prop gives React a stable identity for each list item, enabling efficient reconciliation during re-renders.',
  },
  {
    text: 'What does `useMemo` do?',
    options: [
      'Memoizes a callback function',
      'Memoizes a computed value to avoid expensive recalculations',
      'Persists a mutable value across renders without causing re-renders',
      'Replaces useState for complex state',
    ],
    answer: 1,
    explanation:
      '`useMemo` caches the result of an expensive computation and only recalculates it when its dependencies change.',
  },
  {
    text: 'What is the difference between controlled and uncontrolled components?',
    options: [
      'Controlled components use refs; uncontrolled use state',
      'Controlled components have their state managed by React; uncontrolled components manage their own state via the DOM',
      'Uncontrolled components are always class components',
      'There is no practical difference',
    ],
    answer: 1,
    explanation:
      'In a controlled component, form data is driven by React state. In an uncontrolled component, the DOM handles its own state accessed via a ref.',
  },
  {
    text: 'When does React batch state updates?',
    options: [
      'Never — each setState call triggers a separate render',
      'Only inside class components',
      'Inside event handlers and, as of React 18, inside async code via automatic batching',
      'Only inside useEffect',
    ],
    answer: 2,
    explanation:
      'React has always batched updates inside event handlers. React 18 introduced automatic batching for async code (promises, setTimeout) as well.',
  },
];

export default reactQuestions;
