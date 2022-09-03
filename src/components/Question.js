import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScoreAction } from '../redux/actions';

const thirtySec = 30000;

class Question extends Component {
  state = {
    timer: 30,
    interval: 0,
    nextButtonEnabled: false,
    secInterval: 0,
  };

  componentDidMount() {
    const { changeQuestion } = this.props;
    const oneSec = 1000;
    const interval = setInterval(changeQuestion, thirtySec);
    const secInterval = setInterval(this.decreaseTime, oneSec);
    this.setState({ interval, secInterval });
  }

  componentWillUnmount() {
    const { interval, secInterval } = this.state;
    clearInterval(interval);
    clearInterval(secInterval);
  }

  decreaseTime = () => {
    const { timer } = this.state;
    if (timer > 0) this.setState((previous) => ({ timer: previous.timer - 1 }));
    else this.setState({ nextButtonEnabled: true });
  }

  sumScore = (difficulty) => {
    const { timer } = this.state;
    const base = 10;
    const hard = 3;
    let difficultyModifier;
    if (difficulty === 'hard') difficultyModifier = hard;
    else if (difficulty === 'medium') difficultyModifier = 2;
    else if (difficulty === 'easy') difficultyModifier = 1;

    return base + (timer * difficultyModifier);
  }

  setNewQuestionTimer = () => {
    const { changeQuestion } = this.props;
    const { interval } = this.state;
    clearInterval(interval);
    const newInterval = setInterval(changeQuestion, thirtySec);
    this.setState({ timer: 30, interval: newInterval });
  }

  handleClick = (event, rightOrNot, difficulty) => {
    const { changeQuestion, addScore } = this.props;
    if (rightOrNot === 'correct-answer') addScore(this.sumScore(difficulty));
    changeQuestion(event);
    this.setState({ nextButtonEnabled: true });
  }

  handleNext = () => {
    const { nextQuestion, currentQuestionIndex, history } = this.props;
    this.setNewQuestionTimer();
    nextQuestion();
    this.setState({ nextButtonEnabled: false });
    const LAST_QUESTION = 4;
    if (currentQuestionIndex === LAST_QUESTION) history.push('/feedback');
  }

  render() {
    const { question, allAnswers } = this.props;
    const { timer, nextButtonEnabled } = this.state;
    let index = 0;
    return (
      <div className="question-container">
        <p data-testid="timer">
          You&#039;ve got
          {' '}
          <span className="timer">{timer}</span>
          {' '}
          seconds left!
        </p>
        <p data-testid="question-category">
          Question Theme:
          {' '}
          <span className="theme">{question.category}</span>
        </p>
        <p data-testid="question-text">
          {question.question
            .replace(/&quot;/g, '\'')
            .replace(/&#039;/g, '\'')}
        </p>
        <div data-testid="answer-options" className="answers">
          {allAnswers.map((answer) => {
            let rightOrNot = '';
            if (answer === question.correct_answer) rightOrNot = 'correct-answer';
            else {
              rightOrNot = `wrong-answer-${index}`;
              index += 1;
            }
            return (
              <button
                key={ answer }
                type="button"
                data-testid={ rightOrNot }
                onClick={ (event) => {
                  this.handleClick(event, rightOrNot, question.difficulty);
                } }
                className={ `${rightOrNot} btn btn-warning` }
              >
                {answer}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleNext }
          className="btn btn-primary"
          disabled={ !nextButtonEnabled }
        >
          Next
        </button>
      </div>);
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  changeQuestion: PropTypes.func.isRequired,
  allAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  addScore: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScore: (payload) => dispatch(addScoreAction(payload)),
});

export default connect(null, mapDispatchToProps)(Question);
