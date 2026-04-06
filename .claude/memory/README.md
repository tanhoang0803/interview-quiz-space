# Memory

This directory holds persistent context for the Claude agent across sessions.

## Files
- `user_history.md` — user quiz history shape and Firestore path
- `weak_areas.md` — how weak areas are computed and stored
- `ai_cache.md` — AI question cache strategy

## Firestore Paths
```
users/{uid}/results/{resultId}     # Quiz results
quizzes/{quizId}                   # Quiz definitions
aiQuestions/{topic}                # Cached AI questions
```
