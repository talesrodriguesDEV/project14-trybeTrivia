import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const playerName = localStorage.getItem('playerName');
    return (
      <div className="header">
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
          id="header-player-name"
        >
          { name || playerName }
        </p>
        <p data-testid="header-score">
          You&#039;ve got
          {' '}
          <span>{ score }</span>
          {' '}
          points so far!
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
