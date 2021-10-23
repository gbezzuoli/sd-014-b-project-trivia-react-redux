import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAvatar } from '../redux/actions/actions';

class Header extends Component {
  componentDidMount() {
    const { email, getAvatar } = this.props;
    getAvatar(email);
  }

  render() {
    const { name, avatar } = this.props;

    return (
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{`Pontos: ${0}`}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  avatar: state.user.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (email) => dispatch(fetchAvatar(email)),
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  getAvatar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
