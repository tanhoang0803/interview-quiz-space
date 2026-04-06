# QuizAgent

Handles all quiz CRUD operations through `quizService.js`.

## Responsibilities
- Fetch quizzes by topic from Firestore
- Create new quizzes
- Update existing quizzes
- Delete quizzes

## Tools
- `quizService.getQuizzesByTopic(topic)`
- `quizService.createQuiz(data)`
- `quizService.updateQuiz(id, data)`
- `quizService.deleteQuiz(id)`

## Rules
- Never write to Firestore directly from a component
- Validate quiz shape before writing: `{ topic, title, questions: [{ text, options, answer, explanation }] }`
