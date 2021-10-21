import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { getId } from '../services/triviaAPI';
// import { saveQuestions } from '../redux/actions';
import GameCard from '../components/GameCard';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loading: true,
    };

    this.getQuestionsFromApi = this.getQuestionsFromApi.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromApi();
  }

  async getQuestionsFromApi() {
    const response = await getId(localStorage.getItem('token'));
    const json = await response.json();

    this.setState({
      questions: json.results,
      loading: false,
    });
  }

  render() {
    const { questions, loading } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div>
        <Header />
        <GameCard questions={ questions } />
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   dispatchQuestions: (questions) => dispatch((saveQuestions(questions))),
// });

// export default connect(null, mapDispatchToProps)(Game);
export default Game;
