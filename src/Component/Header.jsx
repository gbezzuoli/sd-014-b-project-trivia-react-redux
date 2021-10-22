import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatar from '../services/apiGravatar';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <section>
        <h1>
          Header
        </h1>
        <img
          data-testid="header-profile-picture"
          alt={ name }
          src={ getGravatar({ gravatarEmail }) }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </section>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
