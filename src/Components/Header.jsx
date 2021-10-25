import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';
import getProfilePic from '../services/getProfilePic';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header className="game-header">
        <img
          src={ getProfilePic(gravatarEmail) }
          alt="player profile pic"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = PropTypes.shape({
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
}).isRequired;

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name, gravatarEmail, score,
});

export default connect(mapStateToProps, null)(Header);
