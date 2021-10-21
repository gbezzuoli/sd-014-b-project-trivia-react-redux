import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/headerstyle.css';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name } = this.props;

    return (
      <header className="header-container">
        <image
          data-testid="header-profile-picture"
          src=""
          alt="image player"
        />
        <span data-testid="header-player-name">{ name }</span>
        <div data-testid="header-score">0</div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
});

export default connect(mapStateToProps)(Header);
