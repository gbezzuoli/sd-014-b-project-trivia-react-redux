import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends Component {
/*   constructor(props) {
    super(props);
    this.state = {

    };
  } */

  render() {
    const { history, name, email } = this.props;
    console.log(`https://www.gravatar.com/avatar/${md5(email).toString()}`);
    return (
      <>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
        <header>
          <span data-testid="header-player-name">{ name }</span>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-score">0</span>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
