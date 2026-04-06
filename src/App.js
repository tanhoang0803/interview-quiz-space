import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/slices/userSlice';
import { resetQuiz } from './store/slices/quizSlice';
import { clearHistory } from './store/slices/resultSlice';
import { authService } from './services/authService';

import Navbar from './components/Navbar/Navbar';
import TopicSelector from './components/TopicSelector/TopicSelector';
import QuizList from './components/QuizList/QuizList';
import QuizPlayer from './components/QuizPlayer/QuizPlayer';
import ResultPage from './components/ResultPage/ResultPage';
import Dashboard from './components/Dashboard/Dashboard';
import QuizForm from './components/QuizForm/QuizForm';
import AuthPage from './components/Auth/AuthPage';
import SeedPage from './components/SeedPage/SeedPage';

import './App.css';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) return <Navigate to="/auth" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) return <Navigate to="/" replace />;
  return children;
};

const NavbarWrapper = () => {
  const { pathname } = useLocation();
  if (pathname === '/auth') return null;
  return <Navbar />;
};

const App = () => {
  const dispatch = useDispatch();
  const { authReady } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(setUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(resetQuiz());
        dispatch(clearHistory());
        dispatch(setUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  if (!authReady) return null;

  return (
    <BrowserRouter>
      <NavbarWrapper />
      <main>
        <Routes>
          <Route path="/auth" element={<GuestRoute><AuthPage /></GuestRoute>} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TopicSelector />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizzes/:topic"
            element={
              <ProtectedRoute>
                <QuizList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:quizId"
            element={
              <ProtectedRoute>
                <QuizPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <QuizForm />
              </ProtectedRoute>
            }
          />

          <Route path="/seed" element={<ProtectedRoute><SeedPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
