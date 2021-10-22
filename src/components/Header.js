import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className="header-game">
          <img
            src={ `https://www.gravatar.com/avatar/${img}` }
            alt="Gravatar"
            data-testid="header-´profile-picture"
          />
          <p data-testid="header-player-name">name</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

Header.propTypes = {};
