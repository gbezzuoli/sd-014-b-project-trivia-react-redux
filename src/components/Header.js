import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor(props) {
    super(props);

    this.requestGravatar = this.requestGravatar.bind(this);
  }

  componentDidMount() {
    this.requestGravatar();
  }

  requestGravatar() {
    const { player: { email } } = this.props;
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.requestGravatar() }
          alt="imagem-avatar"
        />
        ;
        <h4 data-testid="header-player-name">{ player.name }</h4>
        <h4 data-testid="header-score">0</h4>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerInfo.player,
});

export default connect(mapStateToProps, null)(Header);
