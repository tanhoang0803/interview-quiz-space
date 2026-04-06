/**
 * Seed script — run once to populate Firestore with starter quizzes.
 * Usage: import and call seedDatabase() from a temporary admin page, then remove.
 */
import { quizService } from '../services/quizService';
import javascriptQuestions from '../data/questions/javascript';
import dsaQuestions from '../data/questions/dsa';
import reactQuestions from '../data/questions/react';

const seedQuizzes = [
  {
    title: 'JavaScript Fundamentals',
    topic: 'javascript',
    questions: javascriptQuestions,
  },
  {
    title: 'Data Structures & Algorithms',
    topic: 'dsa',
    questions: dsaQuestions,
  },
  {
    title: 'React Core Concepts',
    topic: 'react',
    questions: reactQuestions,
  },
];

export const seedDatabase = async () => {
  for (const quiz of seedQuizzes) {
    const id = await quizService.createQuiz(quiz);
    console.log(`Seeded: ${quiz.title} (id: ${id})`);
  }
  console.log('Seed complete.');
};
