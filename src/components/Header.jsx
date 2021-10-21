import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, hash } = this.props;
    return (
      <header>
        <p data-testid="header-player-name">{ name }</p>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt=""
        />
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  hash: state.playerReducer.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
