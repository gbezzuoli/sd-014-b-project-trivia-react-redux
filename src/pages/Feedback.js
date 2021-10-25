import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GameHeader from '../components/GameHeader';
import { resetAssertionsAction } from '../redux/actions/gameActions';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      redirectRanking: false,
      redirectLogin: false,
    };

    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { totalAssertions } = this.props;
    const WELL_DONE_SCORE = 3;
    if (totalAssertions < WELL_DONE_SCORE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { redirectRanking, redirectLogin } = this.state;
    const { totalScore, totalAssertions, resetScoreboard } = this.props;
    if (redirectRanking) return <Redirect to="/ranking" />;
    if (redirectLogin) return <Redirect to="/" />;
    return (
      <main>
        <GameHeader />
        <h2 data-testid="feedback-text">{ this.feedbackMessage() }</h2>
        <h3 data-testid="feedback-total-question">
          { totalAssertions }
        </h3>
        <h3 data-testid="feedback-total-score">
          { totalScore }
        </h3>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            resetScoreboard();
            this.setState({ redirectRanking: true });
          } }
        >
          Ver Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            resetScoreboard();
            this.setState({ redirectLogin: true });
          } }
        >
          Jogar novamente
        </button>
      </main>
    );
  }
}

Feedback.propTypes = {
  resetScoreboard: PropTypes.func.isRequired,
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({ // Incluir state no parâmetro
  totalScore: state.feedback.score,
  totalAssertions: state.feedback.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScoreboard: () => dispatch(resetAssertionsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
