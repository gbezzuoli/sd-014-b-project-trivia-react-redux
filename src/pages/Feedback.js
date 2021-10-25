import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const THREE = 3;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          {
            assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
          }
        </h2>
      </div>
    );
  }
}

export default Feedback;
