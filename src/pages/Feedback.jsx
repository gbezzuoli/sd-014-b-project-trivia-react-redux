import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import getProfile from '../services/gravatar';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {},
      loading: true,
    };
    this.saveState = this.saveState.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));

    if (player) {
      this.saveState(player);
    }
  }

  saveState(player) {
    this.setState({ player, loading: false });
  }

  render() {
    const { player, loading } = this.state;
    const magicNumber = 3;
    return (
      <>
        <Header />
        <div>
          <h3 data-testid="feedback-text">
            { !loading && player.assertions < magicNumber
              ? 'Podia ser melhor...' : 'Mandou bem!' }
          </h3>
        </div>
        <div>
          <h3>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{player.assertions}</span>
            {' '}
            questões!
          </h3>
          <h3>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{player.score}</span>
            {' '}
            pontos
          </h3>
        </div>
        <div>
          <Link
            to={ {
              pathname: '/ranking',
              userInfos: {
                name: player.name,
                score: player.score,
                gravatarImage: getProfile(player.gravatarEmail),
              },
            } }
          >
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default Feedback;
