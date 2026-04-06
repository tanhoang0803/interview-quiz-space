import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resultService } from '../../services/resultService';
import { calculateScore } from '../../utils/scoring';

export const submitResult = createAsyncThunk(
  'result/submit',
  async ({ uid, quizId, topic, questions, userAnswers }, { rejectWithValue }) => {
    try {
      const scoreData = calculateScore(userAnswers, questions);
      const result = { quizId, topic, ...scoreData, timestamp: Date.now() };
      await resultService.saveResult(uid, result);
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchHistory = createAsyncThunk(
  'result/fetchHistory',
  async (uid, { rejectWithValue }) => {
    try {
      return await resultService.getHistory(uid);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const resultSlice = createSlice({
  name: 'result',
  initialState: {
    latestResult: null,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLatestResult: (state) => {
      state.latestResult = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearHistory: (state) => {
      state.latestResult = null;
      state.history = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitResult.fulfilled, (state, action) => {
        state.loading = false;
        state.latestResult = action.payload;
        state.history.unshift(action.payload);
      })
      .addCase(submitResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLatestResult, clearError, clearHistory } = resultSlice.actions;
export default resultSlice.reducer;
