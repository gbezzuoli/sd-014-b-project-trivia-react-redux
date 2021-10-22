import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setLogin from '../redux/actions';
import { Buttons } from '../components/Buttons';
import '../App.css';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { loginSet } = this.props;
    const { login, email } = this.state;
    loginSet(login, email);
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { login, email } = this.state;
    const validadeButton = login && email; // retorna true caso os campos estejam preenchidos
    return (
      <main className="login-main">
        <h2>Trivia</h2>
        <label htmlFor="login">
          <i className="material-icons">
            Nome
          </i>
          <input
            data-testid="input-player-name"
            id="login"
            name="login"
            value={ login }
            onChange={ this.handleChange }
            placeholder=" Nome"
          />
        </label>
        <label htmlFor="email">
          <i className="material-icons">
            Email
          </i>
          <input
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder=" Email"
            type="email"
          />
        </label>
        <br />
        <Buttons validadeButton={ validadeButton } handleClick={ this.handleClick } />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToState = (dispatch) => ({
  loginSet: (login, email) => dispatch(setLogin(login, email)),
});

LoginForm.propTypes = {
  loginSet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToState)(LoginForm);