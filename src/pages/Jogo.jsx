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
      time: 30,
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.timer();
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.timeCount);
    }
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
  }

  timer() {
    const { time } = this.state;
    const magicNumber = 1000;
    if (time > 0) {
      this.timeCount = setInterval(() => (
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }))), magicNumber);
    } else {
      clearInterval(this.timeCount);
    }
  }

  changeColor(event) {
    if (event.target.className !== 'wrong-answer') {
      event.target.style.border = '3px solid rgb(6, 240, 15)';
      document.querySelectorAll('.wrong-answer').forEach((answer) => {
        answer.style.border = '3px solid rgb(255, 0, 0)';
      });
    }
    if (event.target.className === 'wrong-answer') {
      event.target.style.border = '3px solid rgb(255, 0, 0)';
      document.querySelector('.correct-answer')
        .style.border = '3px solid rgb(6, 240, 15)';
    }
  }

  render() {
    const { questionsObj, isFetching } = this.props;
    const { results } = questionsObj;
    const { time } = this.state;
    if (isFetching) {
      return (<h2>Loading</h2>);
    }
    return (
      <div>
        <Header />
        <h1>Jogo</h1>
        <h2 data-testid="question-category">{results[0].category}</h2>
        <h2 data-testid="question-text">{results[0].question}</h2>
        <button
          onClick={ this.changeColor }
          data-testid="correct-answer"
          type="button"
          disabled={ (time === 0) }
          className="correct-answer"
        >
          {results[0].correct_answer}
        </button>
        { results[0].incorrect_answers.map((answer, index) => (
          <button
            onClick={ this.changeColor }
            className="wrong-answer"
            data-testid="wrong-answer"
            type="button"
            key={ index }
          >
            { answer }
          </button>
        )) }
        <h3>{`Tempo:${time}`}</h3>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsDispatch: (token) => dispatch(fetchQuestion(token)),
});

const mapStateToProps = (state) => ({
  questionsObj: state.trivia.questions,
  isFetching: state.trivia.isFetching,
});

Jogo.propTypes = {
  fetchQuestionsDispatch: PropTypes.func.isRequired,
  questionsObj: PropTypes.objectOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
