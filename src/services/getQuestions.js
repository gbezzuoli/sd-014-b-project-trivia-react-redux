const getQuestions = (results) => [...results.incorrect_answers, results.correct_answer];

export default getQuestions;
