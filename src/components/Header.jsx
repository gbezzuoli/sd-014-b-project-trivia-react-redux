import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userName, avatar, score } = this.props;

    return (
      <header>
        {/* Avatar do Jogador */}
        <img src={ avatar } alt="avatar-jogador" />

        {/* Nome do jogador */}
        <h1>{ userName }</h1>

        {/* Placar do Jogador */}
        <span>{ `Placar: ${score}` }</span>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  userName: globalState.saveInfoReducer.userName,
  avatar: globalState.saveInfoReducer.avatar,
  score: globalState.saveInfoReducer.score,
});

export default connect(mapStateToProps)(Header);
