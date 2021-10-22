import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ranking extends Component {
  render() {
    const magicNumber = -1;
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')).sort((a, b) => {
      if (a.score > b.score) {
        return magicNumber;
      }
      return 1;
    });
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { ranking.map((result, indice) => (
            <li
              key={ indice }
            >
              <div>{ indice + 1 }</div>
              <img src={ result.picture } alt={ result.name } />
              <div data-testid={ `player-name-${indice}` }>{ result.name }</div>
              <div>{ result.score }</div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Voltar ao Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
