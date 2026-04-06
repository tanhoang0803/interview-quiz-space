import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTopic, fetchQuizzesByTopic, createQuiz } from '../../store/slices/quizSlice';
import { aiService } from '../../services/aiService';
import styles from './TopicSelector.module.css';

const TOPICS = [
  { id: 'javascript', label: 'JavaScript', icon: 'JS', description: 'Closures, async, prototypes, ES6+' },
  { id: 'dsa', label: 'DSA', icon: 'DS', description: 'Arrays, trees, sorting, complexity' },
  { id: 'react', label: 'React', icon: 'Re', description: 'Hooks, state, lifecycle, patterns' },
];

const TopicSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(null); // topic id being generated
  const [genError, setGenError] = useState('');

  const handleBrowse = (topicId) => {
    dispatch(setTopic(topicId));
    dispatch(fetchQuizzesByTopic(topicId));
    navigate(`/quizzes/${topicId}`);
  };

  const handleGenerateAI = async (e, topicId) => {
    e.stopPropagation();
    setGenerating(topicId);
    setGenError('');
    try {
      const questions = await aiService.generateQuestions(topicId);
      const result = await dispatch(createQuiz({
        title: `AI-Generated ${topicId.charAt(0).toUpperCase() + topicId.slice(1)} Quiz`,
        topic: topicId,
        source: 'ai',
        questions,
      }));
      const quizId = result.payload?.id;
      if (quizId) {
        navigate(`/quiz/${quizId}`);
      } else {
        dispatch(setTopic(topicId));
        dispatch(fetchQuizzesByTopic(topicId));
        navigate(`/quizzes/${topicId}`);
      }
    } catch (err) {
      setGenError(`${topicId}: ${err.message}`);
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose a Topic</h1>
      <p className={styles.subtitle}>Browse existing quizzes or generate a new one instantly with AI</p>

      {genError && <div className={styles.error}>{genError}</div>}

      <div className={styles.grid}>
        {TOPICS.map((topic) => (
          <div key={topic.id} className={styles.card}>
            <span className={styles.icon}>{topic.icon}</span>
            <h2 className={styles.label}>{topic.label}</h2>
            <p className={styles.description}>{topic.description}</p>
            <div className={styles.cardActions}>
              <button
                className={styles.browseBtn}
                onClick={() => handleBrowse(topic.id)}
              >
                Browse
              </button>
              <button
                className={styles.aiBtn}
                onClick={(e) => handleGenerateAI(e, topic.id)}
                disabled={generating === topic.id}
              >
                {generating === topic.id ? 'Generating...' : 'Generate AI Quiz'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
