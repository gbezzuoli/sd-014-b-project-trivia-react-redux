import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveUrlGravatarAction } from '../Redux/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.requestGravatar = this.requestGravatar.bind(this);
  }

  componentDidMount() {
    this.requestGravatar();
  }

  requestGravatar() {
    const { player: { gravatarEmail }, saveUrlGravatar } = this.props;
    const hash = md5(gravatarEmail).toString();
    saveUrlGravatar(`https://www.gravatar.com/avatar/${hash}`);
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { player, score, scores } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.requestGravatar() }
          alt="imagem-avatar"
        />
        <h4 data-testid="header-player-name">{ player.name }</h4>
        <h4 data-testid="header-score">{scores || score}</h4>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  scores: PropTypes.number.isRequired,
  saveUrlGravatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerInfo.player,
  score: state.playerInfo.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveUrlGravatar: (gravatarUrl) => dispatch(saveUrlGravatarAction(gravatarUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
