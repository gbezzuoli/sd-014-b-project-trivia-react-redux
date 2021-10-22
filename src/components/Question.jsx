import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';
import questions from '../redux/reducers/questions';

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endGame: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit() {
    const { index, incrementQuestion } = this.props;
    const lastQuestion = 4;
    incrementQuestion(index);
    if (index === lastQuestion) {
      this.setState({ endGame: true });
    }
  }

  showQuestion() {
    const { gameQuestions, index } = this.props;
    return (
      <div>
        <h1>{`Question #${index}`}</h1>
        <h2 data-testid="question-text">{gameQuestions[index].question}</h2>
        <h3 data-testid="question-category">
          {`Category: ${gameQuestions[index].category}`}
        </h3>
      </div>
    );
  }

  render() {
    // const { finally } = this.state;
    const { questions } = this.props;
    const { endGame } = this.state;

    if (endGame) {
      return <Redirect to="/feedback" />;
    }

    if (questions.length) {
      return (
        <div>
          {this.showQuestion}
        </div>
      );
    }

    return (
      <Loading />
    );
  }
}

Question.propTypes = {
  index: PropTypes.number.isRequired,
  gameQuestions: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf.isRequired,
  incrementQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  index: state.questions.index,
});

const mapDispatchToProps = (dispatch) => ({
  incrementQuestion: (value) => dispatch(questions(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
