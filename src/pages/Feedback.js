import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  feedBackMessage = () => {
    const actualState = JSON.parse(localStorage.getItem('state'));
    const { assertions } = actualState.player;
    const tres = 3;
    if (assertions < tres) {
      return 'Podia ser melhor...';
    } if (assertions >= tres) {
      return 'Mandou bem!';
    }
    return '';
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          {this.feedBackMessage()}
        </h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.userReducer.email,
    name: state.userReducer.name,
    score: state.gameReducer.score,
  };
}

export default connect(mapStateToProps)(Feedback);
