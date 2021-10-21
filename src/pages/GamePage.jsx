import React from 'react';
import { connect } from 'react-redux';
import { resultAsk } from '../actions/actionTypes';
import CardGame from '../components/CardGame';

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
        <CardGame
          index={ index }
          onClick={ this.handleClick }
          questions={ question }
        />
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
