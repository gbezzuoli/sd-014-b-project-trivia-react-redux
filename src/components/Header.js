import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, login } = this.props;
    const hash = md5(email).toString();
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="" />
        <h2 data-testid="header-player-name">{ login }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

Header.propTypes = {
  login: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.login.email,
  login: state.login.login,
});
export default connect(mapStateToProps)(Header);
