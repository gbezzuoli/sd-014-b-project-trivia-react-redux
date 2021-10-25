import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      score: props.score,
      picture: props.gravatarUrl,
      players: [],
    };

    this.saveRankingsPlayer = this.saveRankingsPlayer.bind(this);
    this.renderRankings = this.renderRankings.bind(this);
  }

  componentDidMount() {
    this.saveRankingsPlayer();
  }

  saveRankingsPlayer() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    const { name, score, picture } = this.state;
    const newPlayer = { name, score, picture };
    if (players) {
      this.setState({ players: [...players, newPlayer] });
      return localStorage.setItem('ranking', JSON.stringify([...players, newPlayer]));
    }
    this.setState({ players: [newPlayer] });
    localStorage.setItem('ranking', JSON.stringify([newPlayer]));
  }

  renderRankings() {
    const { players } = this.state;
    return players.sort((a, b) => b.score - a.score).map((player, index) => (
      <li key={ index }>
        <img src={ player.picture } alt={ player.name } />
        <span data-testid={ `player-name-${index}` }>{player.name}</span>
        <span data-testid={ `player-score-${index}` }>{player.score}</span>
      </li>
    ));
  }

  render() {
    const { renderRankings } = this;
    const { players } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {players.length > 0 ? renderRankings() : ''}
        </ul>
        <Link to="/">

          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente

          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ playerInfo: { player: { name, score }, gravatarUrl } }) => ({
  name,
  score,
  gravatarUrl,
});

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
