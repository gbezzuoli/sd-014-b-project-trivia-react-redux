import React from 'react';
import ScoreComponent from '../components/scoreComponents/ScoreComponent';
import Feedback from './Feedback';

class Score extends React.Component {
  render() {
    return (
      <section>
        <ScoreComponent />
        <Feedback />
      </section>
    );
  }
}

export default Score;
