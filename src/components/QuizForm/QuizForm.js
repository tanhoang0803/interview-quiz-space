import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../../store/slices/quizSlice';
import styles from './QuizForm.module.css';

const TOPICS = ['javascript', 'dsa', 'react'];

const emptyQuestion = () => ({
  text: '',
  options: ['', '', '', ''],
  answer: 0,
  explanation: '',
});

const QuizForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [error, setError] = useState('');

  const updateQuestion = (qIdx, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIdx ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qIdx, optIdx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIdx) return q;
        const options = [...q.options];
        options[optIdx] = value;
        return { ...q, options };
      })
    );
  };

  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);

  const removeQuestion = (idx) =>
    setQuestions((prev) => prev.filter((_, i) => i !== idx));

  const validate = () => {
    if (!title.trim()) return 'Quiz title is required.';
    if (questions.length < 3) return 'Minimum 3 questions required.';
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) return `Question ${i + 1}: question text is required.`;
      if (q.options.some((o) => !o.trim())) return `Question ${i + 1}: all 4 options are required.`;
      if (!q.explanation.trim()) return `Question ${i + 1}: explanation is required.`;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    await dispatch(createQuiz({ title, topic, source: 'user', questions }));
    navigate(`/quizzes/${topic}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Create Quiz</h1>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label className={styles.label}>Quiz Title</label>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. JavaScript Closures & Scope"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Topic</label>
        <select className={styles.input} value={topic} onChange={(e) => setTopic(e.target.value)}>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>

      {questions.map((q, qIdx) => (
        <div key={qIdx} className={styles.questionBlock}>
          <div className={styles.questionHeader}>
            <span className={styles.questionNum}>Question {qIdx + 1}</span>
            {questions.length > 1 && (
              <button type="button" className={styles.removeBtn} onClick={() => removeQuestion(qIdx)}>
                Remove
              </button>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Question Text</label>
            <textarea
              className={styles.textarea}
              value={q.text}
              onChange={(e) => updateQuestion(qIdx, 'text', e.target.value)}
              placeholder="Enter question..."
              rows={2}
            />
          </div>

          {q.options.map((opt, optIdx) => (
            <div key={optIdx} className={styles.optionRow}>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  name={`answer-${qIdx}`}
                  checked={q.answer === optIdx}
                  onChange={() => updateQuestion(qIdx, 'answer', optIdx)}
                />
                {String.fromCharCode(65 + optIdx)}
              </label>
              <input
                className={styles.input}
                value={opt}
                onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
              />
            </div>
          ))}

          <div className={styles.field}>
            <label className={styles.label}>Explanation</label>
            <textarea
              className={styles.textarea}
              value={q.explanation}
              onChange={(e) => updateQuestion(qIdx, 'explanation', e.target.value)}
              placeholder="Explain why the correct answer is right..."
              rows={2}
            />
          </div>
        </div>
      ))}

      <button type="button" className={styles.addBtn} onClick={addQuestion}>
        + Add Question
      </button>

      <button type="submit" className={styles.submitBtn}>
        Save Quiz
      </button>
    </form>
  );
};

export default QuizForm;
