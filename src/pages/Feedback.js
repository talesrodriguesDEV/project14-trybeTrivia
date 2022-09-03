import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { restartGame } from '../redux/actions';

class Feedback extends React.Component {
  constructor() {
    super();
    this.salvaNoStore = this.salvaNoStore.bind(this);
  }

  salvaNoStore() {
    const { score, gravatarEmail, name } = this.props;
    const rank = {
      name,
      score,
      picture: gravatarEmail,
    };
    const preRank = JSON.parse(localStorage.getItem('ranking'));
    if (preRank === null && name !== '') {
      localStorage.setItem('ranking', JSON.stringify([rank]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...preRank, rank]));
    }
  }

  render() {
    const { assertions, score, history, restart } = this.props;
    const minAssertions = 3;
    return (
      <div className="bigger-container">
        <Header />
        <div className="feedback">
          <p
            data-testid="feedback-text"
          >
            {this.salvaNoStore()}
            {assertions < minAssertions ? 'Could be better...' : 'Well Done!'}
          </p>
          <p data-testid="feedback-total-score">
            You made
            {' '}
            <span>{score}</span>
            {' '}
            points!
          </p>
          <p data-testid="feedback-total-question">
            And got
            {' '}
            <span>{assertions}</span>
            {' '}
            right!
          </p>
          <button
            className="btn btn-primary"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              restart();
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            className="btn btn-warning"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  restart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch(restartGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
