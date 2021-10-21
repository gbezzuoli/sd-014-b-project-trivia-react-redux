import React from 'react';
import QuestionCard from '../components/QuestionCard';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      asks: [],
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
    this.setState({ asks: data.results });
  }

  render() {
    const answerList = ['A pistol', 'The H.E.V suit', 'Your fists'];
    const questionText = 'Pergunta teste';
    return (
      <div className="question-card">
        <h3
          data-testid="question-category"
          className="question-category"
        >
          {/* { questionCategory } */}
        </h3>
        <p
          data-testid="questionCategory"
          className="question-text"
        >
          {/* { questionText } */}
        </p>
        <QuestionCard answerList={ answerList } questionText={ questionText } />
      </div>
    );
  }
}
