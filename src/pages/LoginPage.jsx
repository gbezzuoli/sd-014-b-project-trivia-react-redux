import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser, resultApi } from '../actions/actionTypes';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onSubmitConfig = this.onSubmitConfig.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  async onSubmit() {
    const { history, dispatchUser, result } = this.props;
    await result();
    dispatchUser(this.state);
    this.setLocalStorage();
    history.push('/game');
  }

  onSubmitConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  setLocalStorage() {
    const { token } = this.props;
    console.log(token);
    localStorage.setItem('token', JSON.stringify(token));
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  validateForm() {
    const { email, name } = this.state;
    return (email.length > 0 && name.length > 0);
  }

  render() {
    const { name, email } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              value={ email }
              type="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.onSubmit }
            disabled={ !this.validateForm() }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.onSubmitConfig }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (emailAndName) => dispatch(setUser(emailAndName)),
  result: () => dispatch(resultApi()),
});

function mapStateToProps(state) {
  console.log(state.userReducer);
  return { token: state.userReducer.apiToken.token };
}

LoginPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),

}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
