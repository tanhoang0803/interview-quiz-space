import javascriptQuestions from './questions/javascript';
import dsaQuestions from './questions/dsa';
import reactQuestions from './questions/react';
import typescriptQuestions from './questions/typescript';

export const STATIC_QUIZZES = [
  {
    id: 'static-javascript',
    title: 'JavaScript Fundamentals',
    topic: 'javascript',
    questions: javascriptQuestions,
  },
  {
    id: 'static-dsa',
    title: 'Data Structures & Algorithms',
    topic: 'dsa',
    questions: dsaQuestions,
  },
  {
    id: 'static-react',
    title: 'React Core Concepts',
    topic: 'react',
    questions: reactQuestions,
  },
  {
    id: 'static-typescript',
    title: 'TypeScript Essentials',
    topic: 'typescript',
    questions: typescriptQuestions,
  },
];

export const getStaticQuizById = (id) => STATIC_QUIZZES.find((q) => q.id === id) || null;
