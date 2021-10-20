import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import './Header.css';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;
    const hash = MD5(gravatarEmail).toString();

    const gravatarImage = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header className="content-info">
        <div>
          <img
            src={ gravatarImage }
            alt="avatar-player"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">{name}</h4>
        </div>
        <div>
          <span data-testid="header-score">0</span>
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
