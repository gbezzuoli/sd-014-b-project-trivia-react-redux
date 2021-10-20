import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePlayerAction } from '../Redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndName = this.validateEmailAndName.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  validateEmailAndName() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) return false;
    return true;
  }

  render() {
    const { name, email } = this.state;
    const { handleChange, validateEmailAndName, state } = this;
    const { savePlayerInfoToGlobal } = this.props;
    return (
      <form>
        <label htmlFor="name">
          Name:
          <input
            value={ name }
            onChange={ handleChange }
            data-testid="input-player-name"
            id="name"
            type="text"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            value={ email }
            onChange={ handleChange }
            data-testid="input-gravatar-email"
            id="email"
            type="email"
          />
        </label>
        <button
          onClick={ () => savePlayerInfoToGlobal(state) }
          disabled={ validateEmailAndName() }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  savePlayerInfoToGlobal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savePlayerInfoToGlobal: (playerInfo) => dispatch(savePlayerAction(playerInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
