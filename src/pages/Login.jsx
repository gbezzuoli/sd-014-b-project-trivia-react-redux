import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTokenAction } from '../redux/actions/TokenAction';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { userName, userEmail } = this.state;
    const { fetchAPI } = this.props;
    return (
      <form>
        <label htmlFor="user">
          <input
            data-testid="input-player-name"
            type="text"
            name="userName"
            value={ userName }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="userEmail"
            value={ userEmail }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            data-testid="btn-play"
            type="submit"
            name="button"
            disabled={ userName.length <= 0 || userEmail.length <= 0 }
            onClick={ () => fetchAPI() }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
};
