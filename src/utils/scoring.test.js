import { calculateScore, getGrade, getPerformanceLabel } from './scoring';

const mockQuestions = [
  { answer: 0, explanation: 'exp1' },
  { answer: 1, explanation: 'exp2' },
  { answer: 2, explanation: 'exp3' },
  { answer: 3, explanation: 'exp4' },
  { answer: 0, explanation: 'exp5' },
];

describe('calculateScore', () => {
  it('returns 100% when all answers are correct', () => {
    const answers = [0, 1, 2, 3, 0];
    const result = calculateScore(answers, mockQuestions);
    expect(result.score).toBe(100);
    expect(result.correct).toBe(5);
    expect(result.total).toBe(5);
    expect(result.breakdown.every((b) => b.isCorrect)).toBe(true);
  });

  it('returns 0% when all answers are wrong', () => {
    const answers = [1, 0, 0, 0, 1];
    const result = calculateScore(answers, mockQuestions);
    expect(result.score).toBe(0);
    expect(result.correct).toBe(0);
  });

  it('returns 80% when 4 of 5 are correct', () => {
    const answers = [0, 1, 2, 0, 0]; // q3 wrong
    const result = calculateScore(answers, mockQuestions);
    expect(result.score).toBe(80);
    expect(result.correct).toBe(4);
  });

  it('marks individual questions correctly in breakdown', () => {
    const answers = [0, 0, 2, 3, 0]; // q1 wrong
    const result = calculateScore(answers, mockQuestions);
    expect(result.breakdown[0].isCorrect).toBe(true);
    expect(result.breakdown[1].isCorrect).toBe(false);
    expect(result.breakdown[1].userAnswer).toBe(0);
    expect(result.breakdown[1].correctAnswer).toBe(1);
  });
});

describe('getGrade', () => {
  it('returns A for >= 90', () => expect(getGrade(90)).toBe('A'));
  it('returns B for 80–89', () => expect(getGrade(85)).toBe('B'));
  it('returns C for 70–79', () => expect(getGrade(70)).toBe('C'));
  it('returns D for 60–69', () => expect(getGrade(60)).toBe('D'));
  it('returns F for < 60', () => expect(getGrade(59)).toBe('F'));
});

describe('getPerformanceLabel', () => {
  it('returns Excellent for >= 90', () => expect(getPerformanceLabel(95)).toBe('Excellent'));
  it('returns Good for 75–89', () => expect(getPerformanceLabel(80)).toBe('Good'));
  it('returns Needs Practice for 60–74', () => expect(getPerformanceLabel(65)).toBe('Needs Practice'));
  it('returns Keep Studying for < 60', () => expect(getPerformanceLabel(50)).toBe('Keep Studying'));
});
