import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { history } = this.props;
    history.push('/game');
  }

  isEmailValid(email) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
  }

  render() {
    const { name, email } = this.state;
    const validate = (this.isEmailValid(email) && name.length > 0);
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            id="name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            id="email"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play"
          disabled={ !validate }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = () => ({});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
