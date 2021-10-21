import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  loading: true,
};

export const fetchQuestions = createAsyncThunk(
  'game/fetchQuestions',
  async (token) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    return (await response).json();
  },
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.results;
      state.loading = false;
    });
  },
});

export default gameSlice.reducer;
