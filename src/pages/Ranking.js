import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { MD5 } from 'crypto-js';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
      redirectLogin: false,
    };

    this.getRankingsFromLocalStore = this.getRankingsFromLocalStore.bind(this);
    this.mapRankings = this.mapRankings.bind(this);
  }

  componentDidMount() {
    this.getRankingsFromLocalStore();
  }

  getRankingsFromLocalStore() {
    const rankingObj = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: rankingObj,
    });
  }

  sortRankingsTopDown() {
    const { ranking } = this.state;
    const ONE = 1;
    const MINUS_ONE = -1;
    const sortedRanking = ranking.sort((a, b) => {
      let comparing = 0;
      if (a.score > b.score) {
        comparing = ONE;
      } if (a.score < b.score) {
        comparing = MINUS_ONE;
      }
      return comparing * MINUS_ONE;
    });
    return sortedRanking;
  }

  mapRankings() {
    const sortedRanking = this.sortRankingsTopDown();
    return (
      <ul>
        { sortedRanking.map(({ name, score, picture }, index) => {
          const cryptoEmail = MD5(picture).toString();
          const pictureURL = `https://www.gravatar.com/avatar/${cryptoEmail}`;
          return (
            <li key={ score }>
              <img src={ pictureURL } alt="Av" width="20" height="20" />
              <span data-testid={ `player-name-${index}` }>{ name }</span>
              <span data-testid={ `player-score-${index}` }>{ score }</span>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { redirectLogin } = this.state;
    if (redirectLogin) return <Redirect to="/" />;
    return (
      <main>
        <h2 data-testid="ranking-title">Ranking</h2>
        <section>
          { this.mapRankings() }
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.setState({ redirectLogin: true }) }
        >
          Tela Inicial
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({ // Adicionar state ao parâmetro.
  scoreboardRanking: state.feedback.ranking, // estado com (provavelmente) o array de players e suas infos: state.REDUCER_JOGO(ou Player).PLAYERS,
});

export default connect(mapStateToProps, null)(Ranking);
