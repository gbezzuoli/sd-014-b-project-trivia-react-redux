import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/headerstyle.css';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email } = this.props;

    return (
      <header className="header-container">
        <image
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${email}` }
          alt={ name }
        />
        <span data-testid="header-player-name">{ name }</span>
        <div data-testid="header-score">0</div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(Header);
