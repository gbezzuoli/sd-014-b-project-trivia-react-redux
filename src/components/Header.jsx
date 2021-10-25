import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import getGavatarAPI from '../services/gravatarAPI';
import { disableButton, saveScore, timerToDefault } from '../redux/actions';
import ScoreComponent from './scoreComponents/ScoreComponent';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userAvatar: '',
      seconds: 30,
    };
    this.requiredAPI = this.requiredAPI.bind(this);
  }

  componentDidMount() {
    this.requiredAPI();
    this.updateTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { timerDisableBtn, resetTimer, stopTime, saveTheScore } = this.props;
    const { seconds } = this.state;
    const limitTime = 1;
    if (prevState.seconds === limitTime) {
      clearInterval(this.interval);
      timerDisableBtn(seconds);
    }
    if (stopTime) {
      clearInterval(this.interval);
      saveTheScore(seconds);
    }
    if (resetTimer) {
      this.resetTimerToThirteen();
    }
  }

  resetTimerToThirteen() {
    const { reset } = this.props;
    reset();
    this.setState({
      seconds: 30,
    });
    clearInterval(this.interval);
    this.updateTimer();
  }

  updateTimer() {
    const oneSecond = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, oneSecond);
  }

  async requiredAPI() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const returnAPI = await getGavatarAPI(hash);
    this.setState({
      userAvatar: returnAPI.url,
    });
  }

  render() {
    const { name } = this.props;
    const { userAvatar, seconds } = this.state;
    return (
      <header>
        <p>{`Timer: ${seconds}s`}</p>
        <img
          src={ userAvatar }
          data-testid="header-profile-picture"
          alt="Foto de perfil do usuário"
        />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <ScoreComponent />
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.user.userInfo.name,
  email: state.user.userInfo.email,
  resetTimer: state.game.resetTimer,
  stopTime: state.game.stopTime,
});

const mapDispatchToProps = (dispatch) => ({
  timerDisableBtn: (state) => dispatch(disableButton(state)),
  reset: (state) => dispatch(timerToDefault(state)),
  saveTheScore: (state) => dispatch(saveScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
