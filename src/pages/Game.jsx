import React from 'react';
import { connect } from 'react-redux';
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
         {arrayQuestions.map((question) => (<div key={question.category}>{question.category}</div>)) }
          {/* {FALTA TERMINAR DE RENDERIZAR AS QUESTOES} */}
      </div>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(Game);
