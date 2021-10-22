export const GET_QUESTIONS = 'GET_QUESTIONS';

const statusQuestions = (payload) => (
  {
    type: GET_QUESTIONS,
    payload,
  }
);

export default statusQuestions;
