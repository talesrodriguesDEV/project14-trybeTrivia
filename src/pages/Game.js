import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions } from '../services/tokenAPI';

class Game extends Component {
  state = {
    questions: [],
    currentQuestionIndex: 0,
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await fetchQuestions(token);
    if (questions === 'invalid') history.push('/');
    else this.setState({ questions });
  }

  changeQuestion = ({ target } = {}) => {
    if (target) this.setAnswersColors(target);
    Array.from(document.querySelectorAll('button'))
      .filter((button) => button.innerText !== 'Next'
      && button.innerText !== 'Play Again'
      && button.innerText !== 'Ranking'
      && button.innerText !== 'Play')
      .forEach((button) => { button.disabled = true; });
  }

  setAnswersColors = (target) => {
    const correctAnswerString = 'correct-answer';
    if (target.className.includes(correctAnswerString)) {
      target.style.border = '3px solid rgb(6, 240, 15)';
    } else if (target.className.includes('wrong-answer')) {
      Array.from(target.parentElement.children)
        .find((answer) => answer.className.includes(correctAnswerString))
        .style.border = '3px solid rgb(6, 240, 15)';
    }
    Array.from(target.parentElement.children)
      .filter((answer) => !answer.className.includes(correctAnswerString))
      .forEach((answer) => { answer.style.border = '3px solid red'; });
  }

  nextQuestion = (currentQuestionIndex, questions) => {
    if (currentQuestionIndex !== questions.length - 1) {
      this.setState((previous) => ({
        currentQuestionIndex: previous.currentQuestionIndex + 1 }));
    }
  }

  render() {
    const { questions, currentQuestionIndex } = this.state;
    const { history } = this.props;
    const half = 0.5;
    return (
      <div className="bigger-container">
        <Header />
        {questions.length !== 0 && <Question
          question={ questions[currentQuestionIndex] }
          changeQuestion={ this.changeQuestion }
          allAnswers={ [...questions[currentQuestionIndex].incorrect_answers,
            questions[currentQuestionIndex].correct_answer]
            .sort(() => Math.random() - half) }
          nextQuestion={ () => this.nextQuestion(currentQuestionIndex, questions) }
          currentQuestionIndex={ currentQuestionIndex }
          history={ history }
        />}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.objectOf(PropTypes.string),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default Game;
