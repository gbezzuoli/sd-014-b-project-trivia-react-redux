import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameQuestions from './GameQuestions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      src: '',
      counter: 0,
    };

    this.srcGenerator = this.srcGenerator.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
  }

  componentDidMount() {
    this.srcGenerator();
  }

  srcGenerator() {
    const { userEmail } = this.props;

    const hash = md5(userEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      src,
    });
  }

  handleCounter() {
    const { counter } = this.state;
    const LAST_NUMBER_COUNTER = 4;
    if (counter === LAST_NUMBER_COUNTER) {
      this.setState({ counter: 0 });
    } else {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));
    }
  }

  render() {
    const { src, counter } = this.state;
    const { userName, userEmail, questions } = this.props;
    return (
      <section>
        <Header userName={ userName } userEmail={ userEmail } src={ src } />
        <h1 data-testid="question-category">{ questions[counter].category }</h1>
        <p data-testid="question-text">{ questions[counter].question }</p>
        <GameQuestions
          key="correct"
          questions={ questions[counter].correct_answer }
          idQuestions={ 5 }
        />
        { questions[counter].incorrect_answers
          .map((element, index) => (<GameQuestions
            key={ index }
            questions={ element }
            idQuestions={ index }
          />))}
        <br />
        <br />
        <button type="button" onClick={ this.handleCounter }>Proximo</button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  userName: state.userReducer.name,
  userEmail: state.userReducer.email,
});

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Game);
