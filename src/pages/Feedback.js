import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GameHeader from '../components/GameHeader';

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
    const { totalScore, totalAssertions } = this.props;
    if (redirectRanking) return <Redirect to="/ranking" />;
    if (redirectLogin) return <Redirect to="/" />;
    return (
      <main>
        <GameHeader score={ totalScore } />
        <h2 data-testid="feedback-text">{ this.feedbackMessage() }</h2>
        <h3 data-testid="feedback-total-question">
          { `Você acertou ${totalAssertions} questões!` }
        </h3>
        <h3 data-testid="feedback-total-score">
          { `Um total de ${totalScore} pontos` }
        </h3>
        <button
          type="button"
          data-testid="ranking-btn"
          onClick={ () => this.setState({ redirectRanking: true }) }
        >
          Ver Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.setState({ redirectLogin: true }) }
        >
          Jogar novamente
        </button>
      </main>
    );
  }
}

Feedback.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({ // Incluir state no parâmetro
  totalScore: state.feedback.score,
  totalAssertions: state.feedback.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
