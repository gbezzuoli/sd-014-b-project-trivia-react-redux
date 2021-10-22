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

  fetchGravatar() {
    const { playerEmail } = this.props;
    const cryptoEmail = MD5(playerEmail).toString();
    const pictureURL = `https://www.gravatar.com/avatar/${cryptoEmail}`;
    this.setState({ picture: pictureURL });
  }

  render() {
    const { playerName } = this.props;
    const { picture } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="User Profile"
        />
        <h3 data-testid="header-player-name">{playerName}</h3>
        <h3 data-testid="header-score">{ 0 }</h3>
      </header>
    );
  }
}

GameHeader.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  // profilePicture: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.email,
});

export default connect(mapStateToProps, null)(GameHeader);
