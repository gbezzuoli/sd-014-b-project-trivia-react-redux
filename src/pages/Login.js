import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePlayer, fetchTrivia } from '../redux/actions';

function validateEmail(email) {
  const userEmail = /\S+@\S+\.\S+/;
  return userEmail.test(email);
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };

    this.handleButton = this.handleButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    const { token, history } = this.props;
    localStorage.setItem('token', JSON.stringify({ token }));
    history.push('/game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, name } = this.state;
    const { setPlayer, fetchToken } = this.props;
    setPlayer(email, name);
    fetchToken();
  }

  handleButton() {
    const { email, name } = this.state;
    if (validateEmail(email) && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Gravatar Email:
            <input
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              name="email"
              type="email"
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="name"
              type="text"
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ isDisabled }
          >
            JOGAR!
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayer: (email, name) => dispatch(savePlayer(email, name)),
  fetchToken: () => dispatch(fetchTrivia()),
});

const mapStateToProps = (state) => ({
  token: state.player.token,
});

Login.propTypes = {
  setPlayer: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
