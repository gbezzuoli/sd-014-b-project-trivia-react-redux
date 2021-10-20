import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';

class GameHeader extends Component {
  render() {
    const { score, name, profilePicture } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ profilePicture }
          alt="User Profile"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{score}</h3>
      </header>
    );
  }
}

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user: { score, name, profilePicture } }) => ({
  score,
  name,
  profilePicture,
});

export default connect(mapStateToProps, null)(GameHeader);
