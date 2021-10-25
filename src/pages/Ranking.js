import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import GoHomeButton from '../components/GoHomeButton';

class Ranking extends Component {
  render() {
    const { players } = JSON.parse(localStorage.getItem('ranking'));
    const playersSorted = players.sort((a, b) => b.score - a.score);
    const { history } = this.props;
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        <ol>
          { playersSorted.map(({ gravatarEmail, name, score }, index) => {
            const emailHash = md5(gravatarEmail).toString();
            const gravatarImage = `https://www.gravatar.com/avatar/${emailHash}`;
            return (
              <li key={ index }>
                <img src={ gravatarImage } alt="Foto do jogador" />
                <span data-testid={ `player-name-${index}` }>{ name }</span>
                <span data-testid={ `player-score-${index}` }>{ score }</span>
              </li>
            );
          })}
        </ol>
        <GoHomeButton history={ history } />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
