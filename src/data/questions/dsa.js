const dsaQuestions = [
  {
    text: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
    answer: 2,
    explanation:
      'Binary search halves the search space on each step. For n elements it takes at most log₂(n) steps, giving O(log n). It requires the array to be sorted and provides random access — hence it works on arrays but not linked lists.',
  },
  {
    text: 'Which data structure gives O(1) average-case lookup, insert, and delete?',
    options: ['Binary Search Tree', 'Hash Table', 'Sorted Array', 'Linked List'],
    answer: 1,
    explanation:
      'A Hash Table uses a hash function to map keys to buckets, giving O(1) average-case for all three operations. Worst case is O(n) due to collisions, but a good hash function and load factor management keeps this rare.',
  },
  {
    text: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
    answer: 1,
    explanation:
      'QuickSort degrades to O(n²) when the pivot is always the smallest or largest element (e.g., already-sorted input with naive pivot selection). Average case is O(n log n). Randomized or median-of-three pivot selection avoids this.',
  },
  {
    text: 'What is the difference between a stack and a queue?',
    options: [
      'No difference — both are linear data structures',
      'Stack is LIFO (Last In First Out); Queue is FIFO (First In First Out)',
      'Stack is FIFO; Queue is LIFO',
      'Stack allows random access; Queue does not',
    ],
    answer: 1,
    explanation:
      'A Stack (LIFO) adds and removes from the same end — like a stack of plates. A Queue (FIFO) adds at the back and removes from the front — like a line of people. Stacks are used for call stacks, undo operations; queues for BFS, task scheduling.',
  },
  {
    text: 'What is the time complexity of accessing an element by index in an array vs a linked list?',
    options: [
      'Both O(1)',
      'Both O(n)',
      'Array O(1), Linked List O(n)',
      'Array O(n), Linked List O(1)',
    ],
    answer: 2,
    explanation:
      'Arrays store elements in contiguous memory, so index access is O(1) — just offset from base address. Linked lists store elements as nodes with pointers; to access index k you must traverse from the head, giving O(n).',
  },
  {
    text: 'What traversal algorithm uses a queue and is best for finding the shortest path in an unweighted graph?',
    options: [
      'Depth-First Search (DFS)',
      'Breadth-First Search (BFS)',
      'Dijkstra\'s Algorithm',
      'In-order traversal',
    ],
    answer: 1,
    explanation:
      'BFS explores nodes level by level using a queue. Because it visits all nodes at distance d before distance d+1, the first time it reaches a node in an unweighted graph is guaranteed to be via the shortest path.',
  },
  {
    text: 'What is a dynamic programming problem?',
    options: [
      'A problem solved using dynamic memory allocation',
      'A problem that changes its constraints at runtime',
      'A problem solved by breaking it into overlapping subproblems and storing results to avoid recomputation',
      'Any problem solved with recursion',
    ],
    answer: 2,
    explanation:
      'Dynamic programming (DP) applies when a problem has overlapping subproblems and optimal substructure. Results are memoized (top-down) or tabulated (bottom-up) to avoid recomputing. Classic examples: Fibonacci, Longest Common Subsequence, 0/1 Knapsack.',
  },
  {
    text: 'What does "amortized O(1)" mean for dynamic array append?',
    options: [
      'Every single append is O(1)',
      'The average cost per append is O(1) when spread across many operations, even though occasional resizing is O(n)',
      'The array never needs to be resized',
      'Appending is always O(n)',
    ],
    answer: 1,
    explanation:
      'When a dynamic array fills up, it doubles in size (O(n) copy). But this happens rarely — the total work for n appends is O(n), so the average per operation is O(1). This "amortized" analysis shows the cost averaged over a sequence of operations.',
  },
  {
    text: 'In a binary search tree (BST), what is the in-order traversal output?',
    options: [
      'Nodes in insertion order',
      'Nodes in reverse order',
      'Nodes in sorted ascending order',
      'Nodes by level',
    ],
    answer: 2,
    explanation:
      'In-order traversal (Left → Root → Right) of a valid BST produces nodes in sorted ascending order. This property makes BSTs useful for range queries and sorted iteration. A balanced BST (AVL, Red-Black) guarantees O(log n) operations.',
  },
  {
    text: 'What is the space complexity of a recursive function that calls itself n times without tail-call optimization?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    answer: 2,
    explanation:
      'Each recursive call adds a frame to the call stack. Without tail-call optimization (TCO), n recursive calls create n stack frames, giving O(n) space. This is why deep recursion can cause stack overflow — iterative solutions or TCO-supporting runtimes are preferred for large n.',
  },
];

export default dsaQuestions;
