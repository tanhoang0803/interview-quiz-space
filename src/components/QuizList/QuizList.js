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

  const [aiStatus, setAiStatus] = useState('idle');
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

  const renderContent = () => {
    if (loading) return <div className={styles.loading}>Loading quizzes...</div>;
    if (error) return <div className={styles.error}>Firestore error: {error}</div>;
    if (quizzes.length === 0) return (
      <div className={styles.empty}>
        <p>No quizzes yet — click <strong>Generate with AI</strong> above or create manually.</p>
        <button className={styles.btn} onClick={() => navigate('/create')}>
          Create manually
        </button>
      </div>
    );
    return (
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
    );
  };

  return (
    <div className={styles.container}>
      {/* Header + AI button always visible */}
      <div className={styles.header}>
        <h1 className={styles.title}>{topic?.toUpperCase()} Quizzes</h1>
        <button
          className={styles.aiBtn}
          onClick={handleGenerateAI}
          disabled={aiStatus === 'loading' || aiStatus === 'done'}
        >
          {aiStatus === 'loading' ? 'Generating...' : aiStatus === 'done' ? '✓ Generated!' : 'Generate with AI'}
        </button>
      </div>

      {aiStatus === 'loading' && (
        <div className={styles.aiLoading}>
          Asking Groq AI to generate {topic} questions... (takes ~5s)
        </div>
      )}
      {aiError && <div className={styles.error}>{aiError}</div>}

      {renderContent()}
    </div>
  );
};

export default QuizList;
