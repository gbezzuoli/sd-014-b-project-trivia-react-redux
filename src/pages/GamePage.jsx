import React from 'react';
import { connect } from 'react-redux';
import { resultAsk } from '../actions/actionTypes';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatchAskGame } = this.props;
    dispatchAskGame();
  }

  handleClick() {
    this.setState((prevState) => ({ index: prevState.index + 1 }));
  }

  render() {
    const { question } = this.props;
    const { index } = this.state;
    console.log(question);
    if (!question) {
      return <h1>Loading ...</h1>;
    }
    return (
      <div>
        <h2 data-testid="question-category">{ question[index].category}</h2>
        <h3 data-testid="question-text">{ question[index].question}</h3>
        <button type="button" data-testid="correct-answer" onClick={ this.handleClick }>{question[index].correct_answer }</button>
        {question[index].incorrect_answers.map((question) => <button type="button" data-testid={ `wrong-answer-${index}` } onClick={ this.handleClick }>{ question }</button>)}
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
