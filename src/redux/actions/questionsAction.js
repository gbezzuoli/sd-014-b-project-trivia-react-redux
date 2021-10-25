export const GET_QUESTIONS = 'GET_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const getQuestions = (value) => ({
  type: GET_QUESTIONS,
  payload: value,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export function fetchQuestionsAction() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      return dispatch(getQuestions(data.results));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
