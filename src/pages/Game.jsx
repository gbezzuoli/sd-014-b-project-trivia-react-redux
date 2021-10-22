import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardGame from '../components/CardGame';
import Header from '../components/Header';
// import getQuestions from '../services/fetchQuestionsAPI';
import { addCount, fetchQuestions } from '../redux/actions';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 30,
    };

    this.retriveQuestions = this.retriveQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.retriveQuestions();
    // this.handleTimeOut();
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
    const FOUR = 4;
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => { button.className = ''; });
    if (count < FOUR) {
      increaseCount(count + 1);
      this.setState({ timer: 30 });
    } else {
      history.push('/result');
    }
    console.log(count);
  }

  render() {
    const { count, questions } = this.props;
    const { timer } = this.state;
    return (
      <div>
        <Header />
        <Timer timer={ timer } />
        TRIVIA
        { questions.length === 0
          ? <span>Loading ...</span>
          : <CardGame question={ questions[count] } next={ this.handleClick } timer={ timer } /> }
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
