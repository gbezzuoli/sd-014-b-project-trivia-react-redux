import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import '../styles/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.getProfilePic = this.getProfilePic.bind(this);
  }

  getProfilePic(email) {
    const hash = MD5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header className="game-header">
        <img
          src={ this.getProfilePic(gravatarEmail) }
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
