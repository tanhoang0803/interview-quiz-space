import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { quizService } from '../../services/quizService';
import { STATIC_QUIZZES } from '../../data/staticQuizzes';

export const fetchQuizzesByTopic = createAsyncThunk(
  'quiz/fetchByTopic',
  async (topic, { rejectWithValue }) => {
    try {
      return await quizService.getQuizzesByTopic(topic);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  'quiz/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await quizService.getQuizById(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createQuiz = createAsyncThunk(
  'quiz/create',
  async (data, { rejectWithValue }) => {
    try {
      const id = await quizService.createQuiz(data);
      return { id, ...data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateQuiz = createAsyncThunk(
  'quiz/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await quizService.updateQuiz(id, data);
      return { id, ...data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'quiz/delete',
  async (id, { rejectWithValue }) => {
    try {
      await quizService.deleteQuiz(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizzes: [],
    globalQuizzes: STATIC_QUIZZES,
    currentQuiz: null,
    activeQuestionIndex: 0,
    userAnswers: [],
    selectedTopic: null,
    loading: false,
    error: null,
  },
  reducers: {
    setTopic: (state, action) => {
      state.selectedTopic = action.payload;
      state.quizzes = [];
    },
    setActiveQuestion: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
    answerQuestion: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.userAnswers[questionIndex] = answer;
    },
    resetQuiz: (state) => {
      state.currentQuiz = null;
      state.activeQuestionIndex = 0;
      state.userAnswers = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzesByTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzesByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzesByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuizById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
        state.activeQuestionIndex = 0;
        state.userAnswers = [];
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.quizzes.push(action.payload);
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        const index = state.quizzes.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) state.quizzes[index] = action.payload;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter((q) => q.id !== action.payload);
      });
  },
});

export const { setTopic, setActiveQuestion, answerQuestion, resetQuiz, clearError } =
  quizSlice.actions;
export default quizSlice.reducer;
