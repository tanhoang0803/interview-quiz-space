import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuizById, answerQuestion, setActiveQuestion } from '../../store/slices/quizSlice';
import { submitResult } from '../../store/slices/resultSlice';
import styles from './QuizPlayer.module.css';

const QuizPlayer = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentQuiz, activeQuestionIndex, userAnswers, loading, error } = useSelector(
    (state) => state.quiz
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchQuizById(quizId));
  }, [dispatch, quizId]);

  if (loading) return <div className={styles.loading}>Loading quiz...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!currentQuiz) return null;

  const questions = currentQuiz.questions;
  const currentQuestion = questions[activeQuestionIndex];
  const progress = ((activeQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answerIndex) => {
    dispatch(answerQuestion({ questionIndex: activeQuestionIndex, answer: answerIndex }));
  };

  const handleNext = () => {
    if (activeQuestionIndex < questions.length - 1) {
      dispatch(setActiveQuestion(activeQuestionIndex + 1));
    }
  };

  const handlePrev = () => {
    if (activeQuestionIndex > 0) {
      dispatch(setActiveQuestion(activeQuestionIndex - 1));
    }
  };

  const handleSubmit = () => {
    dispatch(
      submitResult({
        uid: currentUser.uid,
        quizId: currentQuiz.id,
        topic: currentQuiz.topic,
        questions,
        userAnswers,
      })
    );
    navigate('/result');
  };

  const isLast = activeQuestionIndex === questions.length - 1;
  const allAnswered = userAnswers.filter((a) => a !== undefined).length === questions.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.topic}>{currentQuiz.topic.toUpperCase()}</span>
        <span className={styles.counter}>
          {activeQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.questionCard}>
        <h2 className={styles.questionText}>{currentQuestion.text}</h2>

        <div className={styles.options}>
          {currentQuestion.options.map((option, idx) => {
            const selected = userAnswers[activeQuestionIndex] === idx;
            return (
              <button
                key={idx}
                className={`${styles.option} ${selected ? styles.selected : ''}`}
                onClick={() => handleAnswer(idx)}
              >
                <span className={styles.optionLetter}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.navigation}>
        <button className={styles.navBtn} onClick={handlePrev} disabled={activeQuestionIndex === 0}>
          Previous
        </button>

        {isLast ? (
          <button
            className={`${styles.navBtn} ${styles.submitBtn}`}
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Submit Quiz
          </button>
        ) : (
          <button className={styles.navBtn} onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
