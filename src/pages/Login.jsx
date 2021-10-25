import React from 'react';
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
    this.handleClickSettings = this.handleClickSettings.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { userName, userEmail } = this.state;
    const { fetchAPI, setUserInfo, fetchAPIQuestions, history } = this.props;
    await fetchAPI();
    setUserInfo(userName, userEmail);
    await fetchAPIQuestions();
    history.push('/Game');
  }

  handleClickSettings() {
    const { history } = this.props;
    history.push('/settings');
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
          <button
            data-testid="btn-play"
            type="button"
            name="button"
            disabled={ userName.length <= 0 || userEmail.length <= 0 }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClickSettings }
        >
          Configurações
        </button>
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
  history: PropTypes.shape().isRequired,
};
