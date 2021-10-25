import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="gravatar sprite"
        />
        <div
          data-testid="header-player-name"
        >
          {`Jogador: ${name}`}
          <div data-testid="header-score">{`Pontos: ${score}`}</div>
          {gravatarEmail}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  gravatarEmail: state.user.player.gravatarEmail,
  score: state.user.player.score,
});

export default connect(mapStateToProps)(Header);
