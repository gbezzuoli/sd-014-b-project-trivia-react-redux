import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, score, nome } = this.props;
    const hash = md5(email).toString();
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="" />
        <h2 data-testid="header-player-name">{ nome }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.loginUser.gravatarEmail,
  nome: state.loginUser.name,
});

export default connect(mapStateToProps)(Header);
