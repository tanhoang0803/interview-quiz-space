# Skill: Quiz Creation

Create and manage quizzes through `QuizForm` component and `quizService`.

## Steps
1. User fills `QuizForm` with title, topic, and questions
2. Each question has: `text`, `options` (array of 4), `answer` (index), `explanation`
3. On submit → `quizService.createQuiz(data)` → Firestore
4. Redux `quizSlice` updated with new quiz

## Validation
- Minimum 3 questions per quiz
- Each question must have exactly 4 options
- Answer index must be 0–3
- Explanation is required
