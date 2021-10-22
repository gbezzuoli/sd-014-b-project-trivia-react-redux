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

  async handleClick(path) {
    const { name, email } = this.state;
    const { dispatchSetValue, history } = this.props;
    dispatchSetValue(name, email);
    await requestToken();
    getGravatar(email);
    history.push(path);
  }

  render() {
    const { name, email } = this.state;
    return (
      <section className="input-login">
        <label htmlFor="name-input" className="name-input">
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
        <label htmlFor="email-input" className="name-input">
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
          disabled={ !email || !name }
          dataTestid="btn-play"
          id="button-form"
          onClick={ () => this.handleClick('/game') }
          text="Jogar"
        />
        <Link to="/settings">
          <Buttons
            dataTestid="btn-settings"
            id="button-config"
            text="Configurar"
          />
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
