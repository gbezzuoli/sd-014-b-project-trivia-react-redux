import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
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
    if (timer === 1) clearInterval(tempo);
  }

  /*   componentDidUpdate = (prevProps, prevState) => {
    const TTIME_LIMIT = 0;
    if (prevState.timer === TTIME_LIMIT) {
      this.setState({ timer: 30 });
    }
  } */

  coresResposta =() => {
    const correct = document.querySelector('.correct');
    correct.className = 'correct correct-answer';
    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect incorrect-answer';
      return item;
    });
  }

  handleClick = () => {
    console.log('fostes');
    document.querySelector('.correct-answer').className = 'correct correct-answer';
    document.querySelectorAll('.incorrect-answer').forEach((item) => {
      item.className = 'incorrect incorrect-answer';
    });
  }

  boolean = () => {
    const { questions } = this.props;
    const { timer } = this.state;
    const incorrect = questions[0].incorrect_answers[0];
    const correct = questions[0].correct_answer;
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
    const { timer } = this.state;

    const incorrect = questions[0].incorrect_answers.map((item, index) => (
      <button
        key={ item }
        onClick={ this.handleClick }
        type="button"
        className="incorrect-answer"
        data-testid={ `wrong-answer-${index}` }
        disabled={ timer === 0 }
      >
        { item }
      </button>
    ));

    const correct = (
      <button
        type="button"
        key={ questions[0].correct_answer }
        data-testid="correct-answer"
        className="correct-answer"
        onClick={ this.handleClick }
        disabled={ timer === 0 }
      >
        { questions[0].correct_answer }
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
    const { timer } = this.state;
    if (!questions[0]) {
      return (
        <div>Carregando...</div>
      );
    }
    return (
      <div>
        <h2 data-testid="question-category">{ questions[0].category }</h2>
        <h2 data-testid="question-text">{ questions[0].question}</h2>
        <div>{ timer }</div>
        { ((questions[0].type === 'boolean') ? this.boolean() : this.multiple()) }
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Questions);
