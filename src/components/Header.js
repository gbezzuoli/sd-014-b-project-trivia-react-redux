import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAvatarImg from '../services/Gravatar';
import { getAvatarAction } from '../redux/actions';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    const profileImage = getAvatarImg(email);
    return (
      <div>
        <h1 data-testid="header-player-name">
          { name }
        </h1>
        <br />
        <img
          src={ profileImage }
          alt="Foto do perfil"
          data-testid="header-profile-picture"
        />
        <br />
        <span data-testid="header-score">
          { score }
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.gameReducers.name,
  score: state.gameReducers.score,
  email: state.gameReducers.email,
});

const mapDispatchToProps = (dispatch) => ({
  profileImage: (profileImageURL) => dispatch(getAvatarAction(profileImageURL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
