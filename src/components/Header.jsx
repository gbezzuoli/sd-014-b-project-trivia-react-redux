import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { username, email } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="avatar" />
          <span data-testid="header-player-name">{ username }</span>
          <span data-testid="header-score">Score: 0 </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.name,
  email: state.user.email,
});

Header.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
