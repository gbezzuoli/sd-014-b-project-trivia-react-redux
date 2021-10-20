import md5 from 'crypto-js/md5';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { player: { name,
      gravatarEmail, score } } = JSON.parse(localStorage.getItem('state'));
    const emailHash = md5(gravatarEmail).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${emailHash}`;
    return (
      <header>
        <img
          alt="foto de perfil"
          data-testid="header-profile-picture"
          src={ gravatarImage }
        />
        <h1 data-testid="header-player-name">{ name }</h1>
        <p data-testid="header-score">{`Pontuação: ${score}`}</p>
      </header>
    );
  }
}

export default Header;
