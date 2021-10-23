import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedbacks extends Component {
  render() {
    return (
      <section>
        <p data-testid="feedback-text">Feedbacks</p>
      </section>
    );
  }
}

export default connect()(Feedbacks);
