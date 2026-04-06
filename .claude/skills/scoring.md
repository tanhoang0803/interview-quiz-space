# Skill: Scoring with Explanations

## Location
`src/utils/scoring.js`

## Logic
- Compare user answers array against correct answers array
- Score = (correct / total) * 100
- Per-question result: `{ questionIndex, isCorrect, userAnswer, correctAnswer, explanation }`

## Output shape
```js
{
  score: 80,
  total: 10,
  correct: 8,
  breakdown: [{ questionIndex, isCorrect, userAnswer, correctAnswer, explanation }]
}
```
