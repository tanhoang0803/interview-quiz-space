import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createQuiz } from '../../store/slices/quizSlice';
import { aiService } from '../../services/aiService';
import styles from './QuizList.module.css';

const QuizList = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes, loading, error } = useSelector((state) => state.quiz);

  const [aiStatus, setAiStatus] = useState('idle'); // idle | loading | done | error
  const [aiError, setAiError] = useState('');

  const handleGenerateAI = async () => {
    setAiStatus('loading');
    setAiError('');
    try {
      const questions = await aiService.generateQuestions(topic);
      await dispatch(createQuiz({
        title: `AI-Generated ${topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz`,
        topic,
        questions,
      }));
      setAiStatus('done');
    } catch (err) {
      setAiError(err.message);
      setAiStatus('error');
    }
  };

  if (loading) return <div className={styles.loading}>Loading quizzes...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{topic?.toUpperCase()} Quizzes</h1>
        <button
          className={styles.aiBtn}
          onClick={handleGenerateAI}
          disabled={aiStatus === 'loading' || aiStatus === 'done'}
        >
          {aiStatus === 'loading' ? 'Generating...' : aiStatus === 'done' ? 'Generated!' : 'Generate with AI'}
        </button>
      </div>

      {aiError && <div className={styles.error}>{aiError}</div>}

      {aiStatus === 'loading' && (
        <div className={styles.aiLoading}>
          Asking Groq AI to generate {topic} questions...
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className={styles.empty}>
          <p>No quizzes yet — generate one with AI or create manually.</p>
          <button className={styles.btn} onClick={() => navigate('/create')}>
            Create manually
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
