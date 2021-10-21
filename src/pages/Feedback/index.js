import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GameHeader from '../../components/GameHeader';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      // estados,
      assertions: 4, // Para teste
      totalScore: 50, // Para teste
      redirectRanking: false,
      redirectLogin: false,
    };

    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    // const { estado de acertos } = this.props;
    const { assertions } = this.state; // Só pra estruturar a função. Estado será retirado do redux.
    const WELL_DONE_SCORE = 3;
    if (assertions < WELL_DONE_SCORE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { totalScore, assertions, redirectRanking, redirectLogin } = this.state;
    let NOME_DA_ROTA_DO_JOGO; // Alterar assim que definir a nome.
    if (redirectRanking) return <Redirect to="/" />;
    if (redirectLogin) return <Redirect to={ NOME_DA_ROTA_DO_JOGO } />;
    return (
      <main>
        <GameHeader />
        <h2 data-testid="feedback-text">{ this.feedbackMessage() }</h2>
        <h3 data-testid="feedback-total-question">
          { `Você acertou ${assertions} questões!` }
        </h3>
        {/* assertions e totalScore serão substituídos pelas props do estado global */}
        <h3 data-testid="feedback-total-points">
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

const mapStateToProps = () => ({ // Incluir state no parâmetro
  // estado global da pontuação total: state.REDUCER_DOS_PONTOS.PONTOS_TOTAIS,
  // estado global do número de acertos: state.REDUCER_DOS_ACERTOS.ACERTOS_TOTAIS,
});

export default connect(mapStateToProps, null)(Feedback);
