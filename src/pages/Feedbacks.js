import React, { Component } from 'react';
import Header from '../components/Header';

class Feedbacks extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedbacks</h1>
      </div>
    );
  }
}

export default Feedbacks;
