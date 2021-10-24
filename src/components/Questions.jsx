import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../styles/Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
      ponts: 0,
      questionIndex: 0,
      buttonNext: true,
      assertions: 0,
    };
  }

  componentDidMount = () => {
    this.setTimer();
  }

  setTimer = () => {
    const SECOND = 1000;
    const tempo = setInterval(() => {
      this.timesUp(tempo);
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SECOND);
  }

  timesUp = (tempo) => {
    const { timer } = this.state;
    if (timer === 1) {
      clearInterval(tempo);
      this.setState({ buttonNext: false });
    }
  }

  /*   componentDidUpdate = (prevProps, prevState) => {
    const TTIME_LIMIT = 0;
    if (prevState.timer === TTIME_LIMIT) {
      this.setState({ timer: 30 });
    }
  } */

  handleClick = ({ target }) => {
    document.querySelector('.correct-answer').className = 'correct correct-answer';
    document.querySelectorAll('.incorrect-answer').forEach((item) => {
      item.className = 'incorrect incorrect-answer';
    });
    if (target.classList.contains('correct')) {
      console.log('chamada');
      this.calcPonts();
    }
    this.setState({ buttonNext: false });
  }

  calcPonts = () => {
    const { questions } = this.props;
    const { ponts, timer, assertions } = this.state;
    const pontsExt = 10;
    const pontDifficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    console.log(pontDifficulty[questions.difficulty]);
    const pts = pontsExt + (timer * pontDifficulty[questions[0].difficulty]);
    console.log(pts);
    this.setState({
      ponts: ponts + pts,
      assertions: assertions + 1,
    });

    const objCurrent = JSON.parse(localStorage.getItem('state'));
    objCurrent.player.score = ponts + pts;
    objCurrent.player.assertions = assertions + 1;
    localStorage.setItem('state', JSON.stringify(objCurrent));
  }

  handleNext = () => {
    const { questionIndex, timer } = this.state;
    const { history } = this.props;
    const questionFinish = 4;
    this.setState({
      questionIndex: questionIndex + 1,
      timer: 30,
      buttonNext: true,
    });
    if (timer === 0) this.setTimer();
    if (questionIndex === questionFinish) {
      history.push('/feedback');
    }
  }

  boolean = () => {
    const { questions } = this.props;
    const { timer, questionIndex } = this.state;
    const incorrect = questions[questionIndex].incorrect_answers[0];
    const correct = questions[questionIndex].correct_answer;
    return (
      <>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ timer === 0 }
          className="correct-answer"
          data-testid="correct-answer"
        >
          { correct }
        </button>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ timer === 0 }
          className="incorrect-answer"
          data-testid="wrong-answer-0"
        >
          { incorrect }
        </button>
      </>
    );
  }

  multiple = () => {
    const { questions } = this.props;
    const { timer, questionIndex } = this.state;

    const incorrect = questions[questionIndex].incorrect_answers.map((item, index) => (
      <div key={ item }>
        <button
          onClick={ this.handleClick }
          type="button"
          className="incorrect-answer"
          data-testid={ `wrong-answer-${index}` }
          disabled={ timer === 0 }
        >
          { item }
        </button>
      </div>
    ));

    const correct = (
      <button
        type="button"
        key={ questions[questionIndex].correct_answer }
        data-testid="correct-answer"
        className="correct-answer"
        onClick={ this.handleClick }
        disabled={ timer === 0 }
      >
        { questions[questionIndex].correct_answer }
      </button>
    );

    const magicNumber = -1;
    return [correct, ...incorrect].sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      }
      return magicNumber;
    });
  }

  render() {
    const { questions } = this.props;
    const { timer, questionIndex, buttonNext } = this.state;
    const currentPonts = JSON.parse(localStorage.getItem('state'));
    if (!questions[questionIndex]) {
      return (
        <div>Carregando...</div>
      );
    }
    return (
      <div className="question">
        <span className="time" data-testid="header-score">
          <p>Score:</p>
          { currentPonts.player.score }
        </span>
        <h2 className="quest" data-testid="question-category">
          { questions[questionIndex].category }
        </h2>
        <h2 className="quest" data-testid="question-text">
          { questions[questionIndex].question}
        </h2>
        <div className="time">
          <p>Time left:</p>
          { timer }
        </div>
        <div className="answer">
          {
            questions[questionIndex].type === 'boolean' ? this.boolean() : this.multiple()
          }
          { !buttonNext
            && (
              <button
                className="next"
                type="button"
                data-testid="btn-next"
                disabled={ buttonNext }
                onClick={ this.handleNext }
              >
                Próxima
              </button>
            )}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Questions);
