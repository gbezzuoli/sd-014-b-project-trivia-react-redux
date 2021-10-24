import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Ranking.css';

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
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul className="ranking-list">
          { ranking.map((result, indice) => (
            <li
              key={ indice }
            >
              <div className="rank">{ indice + 1 }</div>
              <img className="img" src={ result.picture } alt={ result.name } />
              <div className="names" data-testid={ `player-name-${indice}` }>
                { result.name }
              </div>
              <div className="names">{ result.score }</div>
            </li>
          ))}
        </ul>
        <button
          className="btn"
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
