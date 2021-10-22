import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardGame from '../components/CardGame';
import Header from '../components/Header';
// import getQuestions from '../services/fetchQuestionsAPI';
import { addCount, fetchQuestions } from '../redux/actions';

const ONE_SECOND = 1000;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 30,
    };

    this.retriveQuestions = this.retriveQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tiktak = this.tiktak.bind(this);
  }

  componentDidMount() {
    this.retriveQuestions();
    this.tiktak();
  }

  tiktak() {
    setInterval(() => {
      this.setState(({ timer }) => ({ timer: timer === 0 ? 0 : timer - 1 }));
    }, ONE_SECOND);
  }

  async retriveQuestions() {
    const { retrieveQuestions } = this.props;
    const token = localStorage.getItem('token');
    retrieveQuestions(token);
    // const questions = await getQuestions(token);
    // this.setState({ arrayQuestions: [...questions] });
  }

  handleClick() {
    const { history, count, increaseCount } = this.props;
    this.setState({ timer: 30 });
    const FOUR = 4;
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => { button.className = ''; });
    if (count < FOUR) {
      increaseCount(count + 1);
    } else {
      history.push('/result');
    }
  }

  render() {
    const { count, questions } = this.props;
    const { timer } = this.state;
    return (
      <div>
        <Header />
        <h1>{timer}</h1>
        TRIVIA
        { questions.length === 0
          ? <span>Loading ...</span>
          : <CardGame
            question={ questions[count] }
            next={ this.handleClick }
            disabled={ timer === 0 }
          />}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  count: game.count,
  questions: game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  increaseCount: (counter) => dispatch(addCount(counter)),
  retrieveQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.defaultProps = {
  count: 0,
  increaseCount: undefined,
  questions: [],
};

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  increaseCount: PropTypes.func,
  retrieveQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
