import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenAPI } from '../services/tokenAPI';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  isButtonDisabled = () => {
    const { name, email } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    return !(emailRegex.test(email) && name.length > 0);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await fetchTokenAPI();
    const { history, login } = this.props;
    const { name } = this.state;
    login(this.state);
    localStorage.setItem('playerName', name);
    history.push('/game');
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit } className="login-container">
        <h1>Let&#039;s play Trivia!</h1>
        <label htmlFor="input-player-name">
          <input
            type="text"
            data-testid="input-player-name"
            id="input-player-name"
            onChange={ this.handleChange }
            name="name"
            placeholder="Name"
            className="form-control"
          />
        </label>
        <label htmlFor="input-player-email">
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="input-player-email"
            onChange={ this.handleChange }
            name="email"
            placeholder="Email"
            className="form-control"
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ this.isButtonDisabled() }
          className="btn btn-primary"
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
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
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
