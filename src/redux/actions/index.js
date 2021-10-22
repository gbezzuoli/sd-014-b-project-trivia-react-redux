export const SET_INFO = 'SET_INFO';
export const SET_QUESTIONS = 'SET_QUESTIONS';

export const setInfo = (info) => ({
  type: SET_INFO,
  userName: info.name,
  avatar: info.avatar,
  score: info.score,
});

export const setQuestion = (payload) => ({ type: SET_QUESTIONS, payload });
export const fetchTriviaAPI = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return dispatch(setQuestion(data.results));
};
