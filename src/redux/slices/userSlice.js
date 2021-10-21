import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import md5 from 'crypto-js/md5';

const initialState = {
  name: '',
  email: '',
  avatar: '',
  tokenAPI: {},
};

export const fetchToken = createAsyncThunk('user/fetchToken', async () => {
  const response = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  return (await response).json();
});

export const fetchAvatar = createAsyncThunk(
  'user/fetchAvatar',
  async (email) => {
    const hash = md5(email).toString();
    const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    return response.url;
  },
);

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
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.tokenAPI = action.payload;
        localStorage.setItem('token', JSON.stringify(action.payload.token));
      })
      .addCase(fetchAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
      })
      .addCase(fetchAvatar.rejected, (state, action) => {
        state.avatar = action.payload;
      });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
