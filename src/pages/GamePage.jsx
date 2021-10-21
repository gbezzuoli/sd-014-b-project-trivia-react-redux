import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resultAvatar } from '../actions/actionTypes';

class GamePage extends React.Component {
  componentDidMount() {
    const { email, getAvatar } = this.props;
    getAvatar(email);
  }

  render() {
    const { name, avatar } = this.props;

    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ avatar }
            alt="Imagem de Avatar"
          />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{`Pontos: ${0}`}</span>
        </header>

        <main>
          <h1>Game Page</h1>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  avatar: state.userReducer.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (email) => dispatch(resultAvatar(email)),
});

GamePage.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
