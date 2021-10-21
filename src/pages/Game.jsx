import React from 'react';
import PropTypes from 'prop-types';
import CardGame from '../components/CardGame';
import Header from '../components/Header';
import getQuestions from '../services/fetchQuestionsAPI';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayQuestions: [],
      count: 0,
    };

    this.retriveQuestions = this.retriveQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.retriveQuestions();
  }

  async retriveQuestions() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    this.setState({ arrayQuestions: [...questions] });
  }

  handleClick() {
    const { history } = this.props;
    const { count } = this.state;
    const FOUR = 4;
    if (count < FOUR) {
      this.setState(() => ({ count: count + 1 }));
    } else {
      history.push('/result');
    }
  }

  render() {
    const { arrayQuestions, count } = this.state;
    console.log(arrayQuestions);
    return (
      <div>
        <Header />
        TRIVIA
        { arrayQuestions.length === 0
          ? <span>Loading ...</span> : <CardGame question={ arrayQuestions[count] } /> }
        <button type="button" onClick={ () => this.handleClick() }>Proxima</button>

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Game;
