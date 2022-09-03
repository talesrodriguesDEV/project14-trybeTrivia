export async function fetchTokenAPI() {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchQuestions(token) {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    if (token === 'INVALID_TOKEN') return 'invalid';
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
