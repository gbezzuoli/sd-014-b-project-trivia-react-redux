import React, { Component } from 'react';
import FeedbackText from '../components/FeedbackText';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackText numberHits={ 2 } />
      </div>
    );
  }
}

export default Feedback;
