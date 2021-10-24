import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import '../styles/Feedback.css';

export default class Feedback extends Component {
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('state'));

    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const resultUser = {
        name: user.player.name,
        score: user.player.score,
        picture: `https://www.gravatar.com/avatar/${md5(user.player.email).toString()}`,
      };
      ranking.push(resultUser);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const resultUser = {
        name: user.player.name,
        score: user.player.score,
        picture: `https://www.gravatar.com/avatar/${md5(user.player.email).toString()}`,
      };
      localStorage.setItem('ranking', JSON.stringify([resultUser]));
    }
  }

  render() {
    const { history } = this.props;
    const user = JSON.parse(localStorage.getItem('state'));

    /*
    const ranking = JSON.parse(localStorage.getItem('state'));
    objCurrent.player.score = ponts + pts;
    objCurrent.player.assertions = assertions + 1;
    localStorage.setItem('state', JSON.stringify(objCurrent));

     [
     ranking: { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
    ] */
    return (
      <div className="feedback-container">
        <header className="header-container">
          <span data-testid="header-player-name">{ user.player.name }</span>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(user.player.email).toString()}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-score">{ user.player.score }</span>
        </header>
        <div data-testid="feedback-text">
          { user.player.assertions < 2 + 1 ? 'Podia ser melhor...' : 'Mandou bem!' }
        </div>
        <div>
          <p data-testid="feedback-total-question">{ user.player.assertions }</p>
          <span data-testid="feedback-total-score">{ user.player.score }</span>
        </div>
        <div className="btns">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
          <button
            onClick={ () => history.push('/ranking') }
            type="button"
            data-testid="btn-ranking"
          >
            Ver ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
