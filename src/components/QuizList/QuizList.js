import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuizList.module.css';

const QuizList = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const { quizzes, loading, error } = useSelector((state) => state.quiz);

  if (loading) return <div className={styles.loading}>Loading quizzes...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{topic?.toUpperCase()} Quizzes</h1>

      {quizzes.length === 0 ? (
        <div className={styles.empty}>
          <p>No quizzes available for this topic yet.</p>
          <button className={styles.btn} onClick={() => navigate('/create')}>
            Create the first quiz
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className={styles.card}>
              <div className={styles.cardInfo}>
                <h2 className={styles.quizTitle}>{quiz.title}</h2>
                <span className={styles.count}>{quiz.questions?.length ?? 0} questions</span>
              </div>
              <button
                className={styles.startBtn}
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
