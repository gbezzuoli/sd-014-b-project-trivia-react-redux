import React, { Component } from 'react';
import Header from '../components/Header';

class FeedbackPage extends Component {
  render() {
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">Feedback Page</h1>
      </section>
    );
  }
}

export default FeedbackPage;
