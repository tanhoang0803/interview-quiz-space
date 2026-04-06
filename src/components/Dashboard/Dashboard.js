import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchHistory } from '../../store/slices/resultSlice';
import { fetchGlobalQuizzes } from '../../store/slices/quizSlice';
import { resultService } from '../../services/resultService';
import { getGrade } from '../../utils/scoring';
import styles from './Dashboard.module.css';

const TOPICS = ['javascript', 'dsa', 'react'];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { history, loading: historyLoading } = useSelector((state) => state.result);
  const { globalQuizzes } = useSelector((state) => state.quiz);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchHistory(currentUser.uid));
      dispatch(fetchGlobalQuizzes());
    }
  }, [dispatch, currentUser]);

  const getTopicStats = (topic) => {
    const results = history.filter((r) => r.topic === topic);
    if (!results.length) return null;
    const avg = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
    const best = Math.max(...results.map((r) => r.score));
    const weakAreas = resultService.getWeakAreas(results, topic);
    return { avg, best, count: results.length, weakAreas };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Progress</h1>

      <div className={styles.statsGrid}>
        {TOPICS.map((topic) => {
          const stats = getTopicStats(topic);
          return (
            <div key={topic} className={styles.topicCard}>
              <h2 className={styles.topicName}>{topic.toUpperCase()}</h2>
              {historyLoading ? (
                <p className={styles.noData}>Loading...</p>
              ) : stats ? (
                <>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Avg Score</span>
                    <span className={styles.statValue}>{stats.avg}% ({getGrade(stats.avg)})</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Best Score</span>
                    <span className={styles.statValue}>{stats.best}%</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Quizzes Taken</span>
                    <span className={styles.statValue}>{stats.count}</span>
                  </div>
                  {stats.weakAreas.length > 0 && (
                    <div className={styles.weakAreas}>
                      <span className={styles.statLabel}>Needs Work</span>
                      <span className={styles.weakCount}>Q{stats.weakAreas[0].questionIndex + 1} (wrong {stats.weakAreas[0].wrongCount}x)</span>
                    </div>
                  )}
                </>
              ) : (
                <p className={styles.noData}>No quizzes taken yet</p>
              )}
            </div>
          );
        })}
      </div>

      {globalQuizzes.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Practice Quizzes</h2>
          <div className={styles.quizGrid}>
            {globalQuizzes.map((quiz) => (
              <div key={quiz.id} className={styles.quizCard}>
                <span className={styles.quizTopic}>{quiz.topic?.toUpperCase()}</span>
                <h3 className={styles.quizTitle}>{quiz.title}</h3>
                <span className={styles.quizCount}>{quiz.questions?.length ?? 0} questions</span>
                <button
                  className={styles.startBtn}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className={styles.sectionTitle}>Recent Activity</h2>
      {history.length === 0 ? (
        <p className={styles.noData}>Complete a quiz to see your history here.</p>
      ) : (
        <div className={styles.historyList}>
          {history.slice(0, 10).map((result, idx) => (
            <div key={idx} className={styles.historyItem}>
              <span className={styles.historyTopic}>{result.topic?.toUpperCase()}</span>
              <span className={styles.historyScore}>
                {result.score}% — {result.correct}/{result.total}
              </span>
              <span className={styles.historyGrade}>{getGrade(result.score)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
