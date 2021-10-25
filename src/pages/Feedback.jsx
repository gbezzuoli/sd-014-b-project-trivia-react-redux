import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  feedbackMessages() {
    const { assertions } = this.props;
    const NUMBER = 3;
    if (assertions <= NUMBER) {
      return (<h1>Podia ser melhor...</h1>);
    } return (<h1>Mandou bem!</h1>);
  }

  render() {
    return (
      <div>
        <Header />
        {this.feedbackMessages()}
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.assertions,
});

export default connect(mapStateToProps)(Feedback);
