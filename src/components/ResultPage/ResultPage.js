import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGrade, getPerformanceLabel } from '../../utils/scoring';
import styles from './ResultPage.module.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const { latestResult } = useSelector((state) => state.result);
  const { currentQuiz } = useSelector((state) => state.quiz);

  if (!latestResult) {
    return (
      <div className={styles.empty}>
        <p>No result yet. Take a quiz first!</p>
        <button className={styles.btn} onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    );
  }

  const { score, total, correct, breakdown } = latestResult;
  const grade = getGrade(score);
  const label = getPerformanceLabel(score);

  return (
    <div className={styles.container}>
      <div className={styles.scoreCard}>
        <div className={styles.grade}>{grade}</div>
        <div className={styles.score}>{score}%</div>
        <div className={styles.label}>{label}</div>
        <p className={styles.summary}>
          {correct} out of {total} correct
        </p>
      </div>

      <h2 className={styles.sectionTitle}>Review</h2>
      <div className={styles.breakdown}>
        {breakdown.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.item} ${item.isCorrect ? styles.correct : styles.wrong}`}
          >
            <div className={styles.itemHeader}>
              <span className={styles.qIndex}>Q{item.questionIndex + 1}</span>
              <span className={styles.badge}>
                {item.isCorrect ? 'Correct' : 'Wrong'}
              </span>
            </div>
            {currentQuiz && (
              <p className={styles.questionText}>
                {currentQuiz.questions[item.questionIndex]?.text}
              </p>
            )}
            {!item.isCorrect && (
              <p className={styles.answerInfo}>
                Your answer:{' '}
                <span className={styles.wrongAnswer}>
                  {currentQuiz?.questions[item.questionIndex]?.options[item.userAnswer] ?? `Option ${item.userAnswer}`}
                </span>
                {' → '}Correct:{' '}
                <span className={styles.correctAnswer}>
                  {currentQuiz?.questions[item.questionIndex]?.options[item.correctAnswer] ?? `Option ${item.correctAnswer}`}
                </span>
              </p>
            )}
            <p className={styles.explanation}>{item.explanation}</p>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.btn} onClick={() => navigate('/')}>
          Pick Another Topic
        </button>
        <button className={styles.btnSecondary} onClick={() => navigate('/dashboard')}>
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
