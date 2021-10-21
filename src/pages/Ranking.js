import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

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
    const testeRanking = [
      { name: 'Tenobio', score: 10, picture: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Purplecom.jpg' },
      { name: 'Leandro', score: 50, picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/F1_yellow_flag.svg/1280px-F1_yellow_flag.svg.png' },
      { name: 'Jorge', score: 25, picture: 'https://ak.picdn.net/shutterstock/videos/12523241/thumb/1.jpg' },
    ];
    localStorage.setItem('ranking', JSON.stringify(testeRanking));
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
        { sortedRanking.map(({ name, score, picture }, index) => (
          <li key={ score }>
            <img src={ picture } alt="Av" width="20" height="20" />
            {/* {` ${name} - ${score}`} */}
            <span data-testid={ `player-name-${index}` }>{` ${name} - `}</span>
            <span data-testid={ `player-score-${index}` }>{ score }</span>
          </li>
        ))}
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
          onClick={ () => this.setState({ redirectLogin: true }) }
        >
          Tela Inicial
        </button>
      </main>
    );
  }
}

const mapStateToProps = () => ({ // Adicionar state ao parâmetro.
  // estado com (provavelmente) o array de players e suas infos: state.REDUCER_JOGO(ou Player).PLAYERS,
});

export default connect(mapStateToProps, null)(Ranking);
