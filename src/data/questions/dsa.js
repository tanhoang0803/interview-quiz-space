const dsaQuestions = [
  {
    text: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
    answer: 2,
    explanation:
      'Binary search halves the search space on each step, giving O(log n) time complexity.',
  },
  {
    text: 'Which data structure uses LIFO (Last In, First Out) order?',
    options: ['Queue', 'Stack', 'Linked List', 'Heap'],
    answer: 1,
    explanation:
      'A Stack follows LIFO — the last element pushed is the first one popped.',
  },
  {
    text: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
    answer: 1,
    explanation:
      'QuickSort degrades to O(n²) in the worst case (e.g., already sorted array with poor pivot selection). Average case is O(n log n).',
  },
  {
    text: 'What is a hash collision?',
    options: [
      'When two keys have the same value',
      'When two different keys hash to the same bucket',
      'When a hash table is full',
      'When a key cannot be found',
    ],
    answer: 1,
    explanation:
      'A collision occurs when two different inputs produce the same hash index. Resolved via chaining or open addressing.',
  },
  {
    text: 'Which traversal visits nodes in Left → Root → Right order?',
    options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'],
    answer: 2,
    explanation:
      'In-order traversal visits the left subtree, then the root, then the right subtree — which yields sorted values for a BST.',
  },
];

export default dsaQuestions;
