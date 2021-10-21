import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Answers extends Component {
  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        Respostas
      </div>
    );
  }
}

Answers.propTypes = {
  questions: PropTypes.isRequired,
};

export default Answers;
