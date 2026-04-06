import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/userSlice';
import styles from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/auth');
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>Quiz Space</Link>

      <div className={styles.links}>
        {currentUser && (
          <>
            <Link to="/" className={styles.link}>Topics</Link>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link>
            <Link to="/create" className={styles.link}>Create Quiz</Link>
          </>
        )}
      </div>

      <div className={styles.userArea}>
        {currentUser ? (
          <>
            <span className={styles.email}>{currentUser.displayName || currentUser.email}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <Link to="/auth" className={styles.logoutBtn}>Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
