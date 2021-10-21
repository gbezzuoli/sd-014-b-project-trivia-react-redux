import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setuserdata } from '../../Redux/Actions';
import { requestToken } from '../../services/Api';
import getGravatar from '../../services/getGravatar';
import Buttons from '../Buttons';

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
    getGravatar(email);
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
        <Buttons
          path="/game"
          disabled={ !email || !name }
          dataTestid="btn-play"
          id="button-form"
          onClick={ this.handleClick }
          text="Jogar"
        />
        <Buttons
          path="/settings"
          dataTestid="btn-settings"
          id="button-config"
          text="Configurar"
        />
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
