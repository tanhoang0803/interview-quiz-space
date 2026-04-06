import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  clearError,
} from '../../store/slices/userSlice';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const action = mode === 'login'
      ? loginWithEmail({ email, password })
      : registerWithEmail({ email, password });

    const result = await dispatch(action);
    if (!result.error) navigate('/');
  };

  const handleGoogle = async () => {
    dispatch(clearError());
    const result = await dispatch(loginWithGoogle());
    if (!result.error) navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>Quiz Space</h1>
        <p className={styles.tagline}>Master your interviews</p>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'login' ? styles.active : ''}`}
            onClick={() => setMode('login')}
          >
            Log In
          </button>
          <button
            className={`${styles.tab} ${mode === 'register' ? styles.active : ''}`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Register'}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <button className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
