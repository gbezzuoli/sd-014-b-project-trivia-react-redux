import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class GameHeader extends Component {
  constructor() {
    super();

    this.state = {
      picture: '',
    };

    this.fetchGravatar = this.fetchGravatar.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  //

  fetchGravatar() {
    const { playerEmail } = this.props;
    const cryptoEmail = MD5(playerEmail).toString();
    const pictureURL = `https://www.gravatar.com/avatar/${cryptoEmail}`;
    this.setState({ picture: pictureURL });
  }

  render() {
    const { playerName, score } = this.props;
    const { picture } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="User Profile"
        />
        <h3 data-testid="header-player-name">{playerName}</h3>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

GameHeader.propTypes = {
  playerEmail: PropTypes.string.isRequired, // profilePicture: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.email,
  score: state.game.score,
});

export default connect(mapStateToProps, null)(GameHeader);
