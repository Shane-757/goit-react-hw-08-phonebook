import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const registerUser = createAsyncThunk('auth/register', async (user) => {
  const response = await fetch('https://connections-api.herokuapp.com/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to register user');
  }
});

export const loginUser = createAsyncThunk('auth/login', async (user) => {
  const response = await fetch('https://connections-api.herokuapp.com/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to login');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  // Your logout logic here
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;