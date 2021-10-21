import React from 'react';
import { connect } from 'react-redux';
import { resultAsk } from '../actions/actionTypes';

class GamePage extends React.Component {
  async componentDidMount() {
    const { dispatchAskGame } = this.props;
    await dispatchAskGame();
  }

  render() {
    const { results } = this.props;
    console.log(results[0]);
    return (
      <div>
        <h2 data-testid="question-category ">{}</h2>
        <h3 data-testid="question-text ">{}</h3>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAskGame: () => dispatch(resultAsk()),
});

function mapStateToProps(state) {
  return { results: state.gameReducer.results };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
