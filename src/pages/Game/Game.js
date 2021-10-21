import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../../actions';

class Game extends Component {
  constructor() {
    super();
    this.requestQuestions = this.requestQuestions.bind(this);
    this.skipQuestion = this.skipQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.generateButton = this.generateButton.bind(this);
    this.state = {
      tag: 0,
      button: false,
    };
  }

  componentDidMount() {
    this.requestQuestions();
  }

  async requestQuestions() {
    const { saveQuestions } = this.props;
    await saveQuestions();
  }

  skipQuestion() {
    const { tag } = this.state;
    this.setState({
      tag: tag + 1,
      button: false,
    });
  }

  handleClick() {
    this.setState({
      button: true,
    });
  }

  generateButton() {
    return (
      <button
        type="button"
        onClick={ this.skipQuestion }
        data-testid="btn-next"
      >
        Próxima Pergunta!
      </button>);
  }

  render() {
    const { tag, button } = this.state;
    const {
      loading,
      questions,
    } = this.props;
    const randomInt = 0.5;
    if (loading === false) {
      return (
        <div>
          <h3 data-testid="question-category">{ questions[tag].category }</h3>
          <h3 data-testid="question-text">{ questions[tag].question }</h3>
          { [questions[tag].correct_answer, ...questions[tag].incorrect_answers]
            .sort(() => Math.random() - randomInt)
            .map((e, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ e === questions[tag].correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                onClick={ () => this.handleClick() }
              >
                { e }
              </button>)) }
          {button
            ? this.generateButton()
            : null}
        </div>
      );
    }
    return <div> Loading... </div>;
  }
}

const mapStateToProps = (state) => ({
  loading: state.game.loading,
  questions: state.game.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(fetchAPI()),
});

Game.propTypes = {
  fetchAPI: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
