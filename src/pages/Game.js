import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import fetchQuestions from '../services/FetchQuestions';
import Question from '../components/Question';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      correctAnswer: '',
      // answered: false,
      count: -1,
      disabledState: false,
      timer: 35,
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStyle = this.addStyle.bind(this);
  }

  componentDidMount() {
    this.requestAPI();
    this.tick();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.timerID);
      this.addStyle();
    }
  }

  tick() {
    const ONE_SECOND = 1000;
    this.timerID = setInterval(() => this.setState((prevState) => ({
      timer: prevState.timer - 1,
    })), ONE_SECOND);
  }

  handleClick({ target }) {
    const { correctAnswer, count } = this.state;
    const givenAnswer = target.innerHTML;
    if (givenAnswer === correctAnswer) {
      this.setState({ count: count + 1 });
    }
    this.addStyle();
    this.setState({ disabledState: true, timer: 0 });
  }

  async requestAPI() {
    const { token } = this.props;
    const allQuestions = await fetchQuestions(token);
    this.setState({
      questions: allQuestions.results,
      correctAnswer: allQuestions.results[0].correct_answer,
    });
    console.log(allQuestions);
  }

  addStyle() {
    const btn = document.querySelectorAll('.wrongButton');
    btn.forEach((button) => {
      button.setAttribute('style', 'border: 3px solid rgb(255, 0, 0)');
    });
    const btnCorrect = document.querySelector('.correctButton');
    btnCorrect.setAttribute('style', 'border: 3px solid rgb(6, 240, 15)');
  }

  render() {
    const { questions, timer, disabledState } = this.state;
    return (
      <div>
        <Header />
        <h1>TRIVIA</h1>
        {questions
          ? <Question questions={ questions } timer={ timer } disable={ disabledState } />
          : <Loading />}
        { `TIMER: ${timer}` }
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.gameReducers.token,
});

export default connect(mapStateToProps, null)(Game);
