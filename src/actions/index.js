import { fetchQuestions } from '../services';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const TIME_IS_OVER = 'TIME_IS_OVER';

export const fetchQuestionsAction = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const thunkQuestions = () => async (dispatch) => {
  try {
    const savedToken = JSON.parse(localStorage.getItem('token'));
    const { results } = await fetchQuestions(savedToken);
    return dispatch(fetchQuestionsAction(results));
  } catch (error) {
    console.error(error.message);
  }
};

export const timeIsOver = (payload) => ({
  type: TIME_IS_OVER,
  payload,
});
