import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';
import getProfile from '../../services/gravatar';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const gravatarImage = getProfile(gravatarEmail);
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
          <span data-testid="header-score">Score: 0</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.state.player.gravatarEmail,
  name: state.state.player.name,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
