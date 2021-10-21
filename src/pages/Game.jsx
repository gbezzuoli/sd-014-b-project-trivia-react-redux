import React from 'react';
import QuestionCard from '../components/QuestionCard';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      asks: [],
      loading: true,
    };

    this.requestTrivia = this.requestTrivia.bind(this);
  }

  async componentDidMount() {
    await this.requestTrivia();
  }

  // Função de requisição do Trivia
  async requestTrivia() {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({ asks: data.results, loading: false });
  }

  render() {
    const { asks, loading } = this.state;
    return (
      <div className="question-card">
        {loading
          ? <span>Loading...</span>
          : <QuestionCard apiResult={ asks } index={ 0 } />}
      </div>
    );
  }
}
