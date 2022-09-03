import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartGame } from '../redux/actions';
import Header from '../components/Header';

class Ranking extends React.Component {
  constructor() {
    super();
    this.carregaDoLocalStore = this.carregaDoLocalStore.bind(this);
  }

  carregaDoLocalStore() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ordenadoRank = ranking.sort((a, b) => b.score - a.score);
    return ordenadoRank;
  }

  render() {
    const { history, restart } = this.props;
    const rank = this.carregaDoLocalStore();
    return (
      <div className="bigger-container">
        <Header />
        <div className="ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
          <table className="table table-dark table-striped table-bordered border-light">
            <thead className="table-light">
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {rank.map((r, i) => (
                <tr key={ i } className="rank-card">
                  <td>{i + 1}</td>
                  <td data-testid={ `tdlayer-name-${i}` }>
                    {r.name || 'Anonymous Player'}
                  </td>
                  <td data-testid={ `player-score-${i}` }>
                    {r.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => {
              restart();
              history.push('/');
            } }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  restart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch(restartGame()),
});

export default connect(null, mapDispatchToProps)(Ranking);
