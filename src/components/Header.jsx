import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      userName,
      userEmail,
      src,
    } = this.props;
    return (
      <header>
        <img src={ src } alt="Gravatar Avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">
          { userName }
        </p>
        <p>
          { userEmail }
        </p>
        <p data-testid="header-score">
          0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default Header;
