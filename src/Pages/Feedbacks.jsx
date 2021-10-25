import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import getProfilePic from '../services/getProfilePic';
import Header from '../Components/Header';

class Feedbacks extends Component {
  render() {
    // const { name, gravatarEmail, score } = this.props;
    return (
      <section>
        <Header />
        <h2 data-testid="feedback-text">Feedbacks</h2>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
      </section>
    );
  }
}

// Feedbacks.propTypes = {
//   gravatarEmail: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   score: PropTypes.number.isRequired,
// };

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedbacks);
