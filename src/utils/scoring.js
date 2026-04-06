/**
 * Calculate quiz score and per-question breakdown.
 *
 * @param {number[]} userAnswers - Array of answer indices selected by the user
 * @param {Array<{answer: number, explanation: string}>} questions - Quiz questions
 * @returns {{ score: number, total: number, correct: number, breakdown: Array }}
 */
export const calculateScore = (userAnswers, questions) => {
  let correct = 0;

  const breakdown = questions.map((question, index) => {
    const isCorrect = userAnswers[index] === question.answer;
    if (isCorrect) correct++;
    return {
      questionIndex: index,
      isCorrect,
      userAnswer: userAnswers[index],
      correctAnswer: question.answer,
      explanation: question.explanation,
    };
  });

  return {
    score: Math.round((correct / questions.length) * 100),
    total: questions.length,
    correct,
    breakdown,
  };
};

/**
 * Return a letter grade based on percentage score.
 */
export const getGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

/**
 * Return a human-readable performance label.
 */
export const getPerformanceLabel = (score) => {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Needs Practice';
  return 'Keep Studying';
};
