# ResultAgent

Tracks scores, history, and weak areas per user.

## Responsibilities
- Submit quiz results after completion
- Retrieve score history per topic
- Identify weak areas (questions answered wrong most often)

## Tools
- `resultSlice.submitResult({ quizId, topic, answers, score })`
- `resultSlice.getHistory(uid)`
- `resultSlice.getWeakAreas(uid, topic)`

## Rules
- Results stored in Firestore at `users/{uid}/results/{resultId}`
- Weak areas computed client-side from result history
