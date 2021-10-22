import React, { Component } from 'react';
import './Header.css';
import getProfile from '../../services/gravatar';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarImage: '',
      score: 0,
    };
    this.saveInfosPlayer = this.saveInfosPlayer.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    if (player !== null) {
      this.saveInfosPlayer(player);
    }
  }

  saveInfosPlayer(player) {
    const { gravatarEmail, name, score } = player;
    const gravatarImage = getProfile(gravatarEmail);
    this.setState({
      name,
      gravatarImage,
      score,
    });
  }

  render() {
    const { gravatarImage, name, score } = this.state;
    return (
      <header className="content-info">
        <div className="image-title">
          <img
            src={ gravatarImage }
            alt="avatar-player"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">{name}</h4>
        </div>
        <div className="content-score">
          <span data-testid="header-score">
            Score:
            {' '}
            {score}
          </span>
        </div>
      </header>
    );
  }
}

export default Header;
