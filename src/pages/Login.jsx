import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { fetchApiThunk, user as userAction } from '../action';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
  }

  bonitinho = () => (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
    </div>
  )

  handleClick = () => {
    const { tokenAction, history, user } = this.props;
    history.push('/game');
    tokenAction();
    user(this.state);
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <>
        { this.bonitinho() }
        <label htmlFor="name">
          name
          <input
            type="text"
            id="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          E-Mail:
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(name && email) }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </>
    );
  }
}

Login.propTypes = {
  tokenAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  tokenAction: (e) => dispatch(fetchApiThunk(e)),
  user: (e) => dispatch(userAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
