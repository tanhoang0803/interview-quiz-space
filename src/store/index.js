import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizSlice';
import resultReducer from './slices/resultSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    result: resultReducer,
    user: userReducer,
  },
});

export default store;
