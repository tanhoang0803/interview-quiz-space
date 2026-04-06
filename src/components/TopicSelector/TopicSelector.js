import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTopic, fetchQuizzesByTopic } from '../../store/slices/quizSlice';
import styles from './TopicSelector.module.css';

const TOPICS = [
  { id: 'javascript', label: 'JavaScript', icon: 'JS', description: 'Closures, async, prototypes, ES6+' },
  { id: 'dsa', label: 'DSA', icon: 'DS', description: 'Arrays, trees, sorting, complexity' },
  { id: 'react', label: 'React', icon: 'Re', description: 'Hooks, state, lifecycle, patterns' },
];

const TopicSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (topic) => {
    dispatch(setTopic(topic));
    dispatch(fetchQuizzesByTopic(topic));
    navigate(`/quizzes/${topic}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose a Topic</h1>
      <p className={styles.subtitle}>Select a topic to start practicing interview questions</p>
      <div className={styles.grid}>
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            className={styles.card}
            onClick={() => handleSelect(topic.id)}
          >
            <span className={styles.icon}>{topic.icon}</span>
            <h2 className={styles.label}>{topic.label}</h2>
            <p className={styles.description}>{topic.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
