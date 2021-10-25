import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequestTriviaGame } from '../redux/actions';

class QuestionsTrivia extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.changeLoading = this.changeLoading.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
    this.changeLoading();
  }

  changeLoading() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { questionsObj } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <div>loading</div>;
    }
    console.log(questionsObj);
    return (
      <div>
        <p data-testid="question-category">{questionsObj[0].category}</p>
        <p data-testid="question-text">{questionsObj[0].question}</p>
        <button
          data-testid="correct-answer"
          type="button"
        >
          {questionsObj[0].correct_answer}
        </button>
        { questionsObj[0].incorrect_answers.map((answer, index) => (
          <button
            data-testid="wrong-answer"
            type="button"
            key={ index }
          >
            { answer }
          </button>
        )) }
        <button type="button" onClick={ this.qualquer }>OMG</button>
      </div>
    );
  }
}
QuestionsTrivia.propTypes = {
  questionsObj: PropTypes.arrayOf(PropTypes.any).isRequired,
  getQuestions: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  questionsObj: state.questions.payload,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getRequestTriviaGame()),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTrivia);
