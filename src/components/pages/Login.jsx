import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setuserdata } from '../../Redux/Actions';
import { requestToken } from '../../services/Api';
import GetGravatar from '../../services/GetGravatar';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { name, email } = this.state;
    const { dispatchSetValue } = this.props;
    dispatchSetValue(name, email);
    requestToken();
    GetGravatar(email);
  }

  render() {
    const { name, email } = this.state;
    return (
      <section>
        <label htmlFor="name-input">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            id="name-input"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            id="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !email || !name }
          data-testid="btn-play"
          id="button-form"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link
          to="/settings"
        >
          <button
            type="button"
            data-testid="btn-settings"
            id="button-config"
          >
            Configurar
          </button>
        </Link>
      </section>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  dispatchSetValue: (state) => {
    dispatch(setuserdata(state));
  },
});

Login.propTypes = {
  dispatchSetValue: PropTypes.func,
}.isRequired;

export default connect(null, mapDipatchToProps)(Login);
// a
