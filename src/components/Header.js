import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAvatar from '../services/gravatarAPI';

class Header extends Component {
  constructor(props) {
    super(props);

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
    const name = localStorage.getItem('name');
    // console.log(name);

    return (
      <header>
        <img src={ img } alt={ `avatar ${name}` } data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.submitPlayerAction.token.player.email,
});

export default connect(mapStateToProps)(Header);
