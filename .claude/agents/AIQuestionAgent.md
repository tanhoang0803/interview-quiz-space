# AIQuestionAgent

Generates interview questions using OpenAI and caches them to avoid repeated API calls.

## Responsibilities
- Generate questions from topic + difficulty input
- Check Firestore cache before calling OpenAI
- Save new AI results to cache

## Tools
- `aiService.generateQuestions(topic, difficulty)`
- `aiService.getCachedQuestions(topic)`
- `aiService.saveToCache(topic, questions)`

## Rules
- Always check cache first — only call OpenAI on cache miss
- Limit: max 10 questions per generation call
- Store cache in Firestore at `aiQuestions/{topic}`
