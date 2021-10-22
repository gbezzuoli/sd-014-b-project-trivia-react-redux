import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchToken from '../services/token';
import { fetchQuestion } from '../redux/actions';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { fetchQuestionsDispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    await fetchQuestionsDispatch(token.token);
    const { questionsObj } = this.props;
    const ERROR_CODE = 3;
    if (questionsObj.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      const newToken = await fetchToken();
      localStorage.setItem('token', JSON.stringify(newToken));
      await fetchQuestionsDispatch(newToken.token);
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { questionsObj } = this.props;
    console.log(questionsObj);
    const question = questionsObj[0];
    console.log(question);
    const { loading } = this.state;
    if (loading) {
      return (<h2>Loading</h2>);
    }
    return (
      <div>
        <Header />
        <h1>Jogo</h1>
        <h2>{question.category}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsDispatch: (token) => dispatch(fetchQuestion(token)),
});

const mapStateToProps = (state) => ({
  questionsObj: state.trivia.questions,
});

Jogo.propTypes = {
  fetchQuestionsDispatch: PropTypes.func.isRequired,
  questionsObj: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
