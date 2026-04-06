const reactQuestions = [
  {
    text: 'What is the difference between `useEffect` with no dependency array, an empty array `[]`, and specific dependencies?',
    options: [
      'All three behave identically',
      'No array = runs after every render; `[]` = runs once on mount; `[dep]` = runs when dep changes',
      'No array = runs once; `[]` = runs every render; `[dep]` = runs on unmount',
      '`[]` and no array are the same',
    ],
    answer: 1,
    explanation:
      'No dependency array: effect runs after every render. Empty array `[]`: runs once after mount (and cleanup on unmount). `[dep1, dep2]`: runs when any listed dependency changes. This controls how often side effects like data fetching, subscriptions, or DOM updates happen.',
  },
  {
    text: 'What is the purpose of the `key` prop in React lists?',
    options: [
      'It styles the list item',
      'It helps React identify which items changed, were added, or removed during reconciliation',
      'It sets the tab index for accessibility',
      'It prevents re-renders of list items',
    ],
    answer: 1,
    explanation:
      '`key` gives React a stable identity for each list item during reconciliation. Without keys (or with index as key when items reorder), React may re-render or mis-update the wrong elements. Use a unique, stable identifier from your data — never array index for mutable lists.',
  },
  {
    text: 'What is the difference between `useMemo` and `useCallback`?',
    options: [
      'They are identical',
      '`useMemo` memoizes a computed value; `useCallback` memoizes a function reference',
      '`useCallback` memoizes a value; `useMemo` memoizes a function',
      '`useMemo` is for class components; `useCallback` is for functional components',
    ],
    answer: 1,
    explanation:
      '`useMemo(() => compute(a, b), [a, b])` caches the result of an expensive calculation. `useCallback((e) => handler(e), [dep])` caches the function itself — useful when passing callbacks to memoized child components to prevent unnecessary re-renders.',
  },
  {
    text: 'What is the difference between controlled and uncontrolled components in React?',
    options: [
      'Controlled components use refs; uncontrolled use state',
      'Controlled components have form data driven by React state; uncontrolled manage their own state via the DOM',
      'Uncontrolled components are always class components',
      'There is no practical difference',
    ],
    answer: 1,
    explanation:
      'Controlled: form input value is bound to React state via `value` + `onChange` — React is the single source of truth. Uncontrolled: the DOM manages its own state, accessed via `ref`. Controlled is preferred for validation, conditional fields, and derived state.',
  },
  {
    text: 'What problem does the React Context API solve?',
    options: [
      'It replaces all need for Redux',
      'It solves prop drilling — passing data through many component layers without threading props at each level',
      'It makes components render faster',
      'It handles side effects like data fetching',
    ],
    answer: 1,
    explanation:
      'Context lets you share values (theme, auth, locale) across a component tree without manually passing props at every level (prop drilling). It\'s not a full state management solution — for complex state with frequent updates, Redux or Zustand perform better due to selective re-rendering.',
  },
  {
    text: 'When does React batch state updates?',
    options: [
      'Never — each setState triggers a separate re-render',
      'Only inside class component lifecycle methods',
      'Inside event handlers always; in React 18+, also inside async code via automatic batching',
      'Only inside useEffect',
    ],
    answer: 2,
    explanation:
      'React has always batched `setState` calls inside event handlers into a single re-render. React 18 introduced automatic batching — multiple state updates inside `setTimeout`, Promises, and native event handlers are now batched too. Use `flushSync` to opt out.',
  },
  {
    text: 'What is reconciliation in React?',
    options: [
      'The process of merging two Redux stores',
      'The algorithm React uses to diff the previous and new virtual DOM and determine minimal DOM updates',
      'Syncing React state with the server',
      'Resolving naming conflicts between components',
    ],
    answer: 1,
    explanation:
      'Reconciliation is React\'s diffing algorithm. When state/props change, React builds a new virtual DOM tree and diffs it against the previous one. Using the `key` prop and component type, it determines the minimal set of real DOM operations needed — making updates efficient.',
  },
  {
    text: 'What is `useRef` used for?',
    options: [
      'Only for accessing DOM elements',
      'Storing a mutable value that persists across renders without triggering re-renders, and accessing DOM nodes directly',
      'Replacing useState for all mutable values',
      'Caching expensive computations',
    ],
    answer: 1,
    explanation:
      '`useRef` returns a mutable object `{ current: value }` that persists for the full lifetime of the component. Mutating `.current` does NOT trigger a re-render. Common uses: storing previous values, holding timers/intervals, and accessing DOM elements imperatively (focus, scroll, measurements).',
  },
  {
    text: 'What is the correct way to update an object in React state?',
    options: [
      '`state.name = "new"` then `setState(state)`',
      '`setState({ ...state, name: "new" })` — spread the old state and override changed fields',
      '`setState(null)` then `setState({ name: "new" })`',
      'Directly mutate state and call `forceUpdate()`',
    ],
    answer: 1,
    explanation:
      'React state must be treated as immutable. Mutating state directly (`state.name = "new"`) won\'t trigger a re-render and can cause subtle bugs. Always create a new object using spread: `setState(prev => ({ ...prev, name: "new" }))`. Use the functional form when the new state depends on previous state.',
  },
  {
    text: 'What is React.memo and when should you use it?',
    options: [
      'A hook for memoizing values inside a component',
      'A HOC that prevents a component from re-rendering if its props haven\'t changed (shallow comparison)',
      'A built-in cache for API responses',
      'A replacement for PureComponent in class components',
    ],
    answer: 1,
    explanation:
      '`React.memo(Component)` wraps a functional component and skips re-rendering if props are shallowly equal to the previous render. Use it for components that render often with the same props — like items in a large list. Don\'t overuse it — the comparison itself has a cost.',
  },
];

export default reactQuestions;
