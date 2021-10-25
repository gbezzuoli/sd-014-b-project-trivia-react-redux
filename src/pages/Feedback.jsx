import React from 'react';
import Header from '../components/Header/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feed Back</h1>
      </div>
    );
  }
}

export default Feedback;
