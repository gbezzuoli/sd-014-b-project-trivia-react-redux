import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAvatar from '../services/gravatarAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      img: '',
    };

    this.setImageInState = this.setImageInState.bind(this);
  }

  async componentDidMount() {
    const { email } = this.props;
    const avatar = await fetchAvatar(email);
    this.setImageInState(avatar);
  }

  setImageInState(img) {
    this.setState({ img });
  }

  render() {
    const { img } = this.state;
    const { score, name } = this.props;

    return (
      <header>
        <img src={ img } alt={ `avatar ${name}` } data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertio: state.player.score,
});

export default connect(mapStateToProps)(Header);
