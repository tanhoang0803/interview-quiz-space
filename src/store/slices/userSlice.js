import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

export const loginWithEmail = createAsyncThunk(
  'user/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authService.loginWithEmail(email, password);
      const { uid, email: userEmail, displayName, photoURL } = result.user;
      return { uid, email: userEmail, displayName, photoURL };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  'user/registerWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authService.registerWithEmail(email, password);
      const { uid, email: userEmail, displayName, photoURL } = result.user;
      return { uid, email: userEmail, displayName, photoURL };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await authService.loginWithGoogle();
      const { uid, email, displayName, photoURL } = result.user;
      return { uid, email, displayName, photoURL };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await authService.logout();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    authReady: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.authReady = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.currentUser = action.payload ?? null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(loginWithEmail.pending, handlePending)
      .addCase(loginWithEmail.fulfilled, handleFulfilled)
      .addCase(loginWithEmail.rejected, handleRejected)
      .addCase(registerWithEmail.pending, handlePending)
      .addCase(registerWithEmail.fulfilled, handleFulfilled)
      .addCase(registerWithEmail.rejected, handleRejected)
      .addCase(loginWithGoogle.pending, handlePending)
      .addCase(loginWithGoogle.fulfilled, handleFulfilled)
      .addCase(loginWithGoogle.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export const { setUser, clearError } = userSlice.actions;
export default userSlice.reducer;
