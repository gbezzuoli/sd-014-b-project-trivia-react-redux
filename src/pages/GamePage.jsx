import React from 'react';
import { connect } from 'react-redux';
import { resultAsk } from '../actions/actionTypes';

class GamePage extends React.Component {
  componentDidMount() {
    const { dispatchAskGame } = this.props;
    dispatchAskGame();
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <h2 data-testid="question-category ">{question}</h2>
        <h3 data-testid="question-text ">{}</h3>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAskGame: () => dispatch(resultAsk()),
});

function mapStateToProps(state) {
  return { question: state.gameReducer.questions.results };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
