async function requestQuestions() {
  const NUM_QUESTIONS = 5;
  const token = JSON.parse(localStorage.getItem('token'));
  const request = await fetch(`https://opentdb.com/api.php?
amount=${NUM_QUESTIONS}&token=${token}`);
  const response = await request.json();
  const question = response.results;
  return question;
}

export default requestQuestions;
