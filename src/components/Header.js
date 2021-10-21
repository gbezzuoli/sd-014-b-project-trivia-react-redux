import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { profileImage, name, score } = this.props;
    return (
      <div>
        <h1 data-testid="header-player-name">
          { name }
        </h1>
        <img
          src={ `https://www.gravatar.com/avatar/${profileImage}` }
          alt="Foto do perfil"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-score">
          { score }
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.gameReducers.name,
  score: state.gameReducers.score,
  profileImage: state.gameReducers.profileImage,

});

export default connect(mapStateToProps, null)(Header);
