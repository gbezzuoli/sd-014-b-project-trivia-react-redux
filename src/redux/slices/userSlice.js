import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  tokenAPI: {},
};

export const fetchToken = createAsyncThunk('user/fetchToken', async () => {
  const response = fetch('https://opentdb.com/api_token.php?command=request');
  return (await response).json();
});

export const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.tokenAPI = action.payload;
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
