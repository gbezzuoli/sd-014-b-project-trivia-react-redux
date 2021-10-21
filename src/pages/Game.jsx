import React from 'react';
import { connect } from 'react-redux';
import CardGame from '../components/CardGame';
import Header from '../components/Header';
import getQuestions from '../services/fetchQuestionsAPI';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayQuestions: [],
    };

    this.retriveQuestions = this.retriveQuestions.bind(this);
  }

  componentDidMount() {
    this.retriveQuestions();
  }

  async retriveQuestions() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    this.setState({ arrayQuestions: [...questions] });
  }

  render() {
    const { arrayQuestions } = this.state;
    console.log(arrayQuestions);
    return (
      <div>
        <Header />
        TRIVIA
        { arrayQuestions.map(
          (question, index) => <CardGame key={ index } question={ question } />,
        )}
      </div>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(Game);
