export const login = (value) => ({ type: 'LOGIN', data: value });
export const user = (value) => ({ type: 'USER', data: value });
export const getQuestions = (payload) => ({ type: 'GET_QUESTIONS', payload });

export function fetchApiQuestions() {
  const getToken = localStorage.getItem('token');
  return async (dispatch) => (
    fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`)
      .then((item) => item.json()
        .then((payload) => dispatch(getQuestions(payload))))
  );
}
