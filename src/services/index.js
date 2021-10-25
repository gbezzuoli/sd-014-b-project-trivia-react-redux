export const fetchToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchQuestions = async (savedToken) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${savedToken}`);
  const result = await response.json();
  return result;
};
