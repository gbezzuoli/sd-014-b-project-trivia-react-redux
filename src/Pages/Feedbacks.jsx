import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedbacks extends Component {
  render() {
    const { score, assertions } = this.props;
    const THREE = 3;
    return (
      <section>
        <Header />
        <h2 data-testid="feedback-text">Feedbacks</h2>
        <section className="feedback-section">
          { assertions < THREE
            ? <p data-testid="feedback-text">Podia ser melhor...</p>
            : <p data-testid="feedback-text">Mandou bem!</p> }
          <p>
            Acertou:
            <span data-testid="feedback-total-question">
              { assertions }
            </span>
          </p>
          <p>
            Pontos:
            <span data-testid="feedback-total-score">
              { score }
            </span>
          </p>
        </section>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
      </section>
    );
  }
}

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedbacks);
