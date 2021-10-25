import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    const { score, assertions } = this.props;
    const { feedback } = this;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ feedback() }</h1>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <Link to="/">

          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente

          </button>
        </Link>
        <Link to="/ranking">

          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking

          </button>
        </Link>
      </div>
    );
  }
}

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ playerInfo: { player: { assertions, score } } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps)(Feedbacks);
