import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedbacks extends Component {
  constructor(props) {
    super(props);

    this.feedback = this.feedback.bind(this);
  }

  feedback() {
    const { assertions } = this.props;
    const number = 3;
    return (assertions < number ? 'Podia ser melhor...' : 'Mandou bem!');
  }

  render() {
    const { feedback } = this;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ feedback() }</h1>
      </div>
    );
  }
}

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ playerInfo: { player: { assertions } } }) => ({
  assertions,
});

export default connect(mapStateToProps)(Feedbacks);
