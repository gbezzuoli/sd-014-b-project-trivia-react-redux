import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequestTriviaGame } from '../redux/actions';
import Loading from './Loading';

class QuestionsTrivia extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questionsObj, loading } = this.props;

    if (loading) {
      return <Loading />;
    }
    const encodeUtf8 = (string) => {
      // função do Lucas Rodrigues Turma 08
      const stringUTF = unescape(encodeURIComponent(string));
      return stringUTF.replace(/&quot;|&#039;/gi, '\'');
    };
    console.log(questionsObj[0].category || 'teste');
    return (
      <div>
        <p data-testid="question-category">{encodeUtf8(questionsObj[0].category)}</p>
        <p data-testid="question-text">{encodeUtf8(questionsObj[0].question)}</p>
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
      </div>
    );
  }
}
QuestionsTrivia.propTypes = {
  questionsObj: PropTypes.arrayOf(PropTypes.any).isRequired,
  getQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  questionsObj: state.questionsReducer.questions,
  loading: state.questionsReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getRequestTriviaGame()),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTrivia);
