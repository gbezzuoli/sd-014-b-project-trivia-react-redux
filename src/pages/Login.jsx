import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTokenAction } from '../redux/actions/TokenAction';
import { fetchQuestionsAction } from '../redux/actions/questionsAction';
import { getUser } from '../redux/actions/userAction';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchAPIQuestions } = this.props;
    fetchAPIQuestions();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { userName, userEmail } = this.state;
    const { fetchAPI, setUserInfo } = this.props;
    fetchAPI();
    setUserInfo(userName, userEmail);
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
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
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </form>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Configurações</button>
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchTokenAction()),
  setUserInfo: (userName, userEmail) => dispatch(getUser(userName, userEmail)),
  fetchAPIQuestions: () => dispatch(fetchQuestionsAction()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  fetchAPIQuestions: PropTypes.func.isRequired,
};
