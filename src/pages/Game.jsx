import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchApiQuestions } from '../action';
import Questions from '../components/Questions';

class Game extends Component {
/*   constructor(props) {
    super(props);
    this.state = {
    };
  } */
  async componentDidMount() {
    const { questionsAction } = this.props;
    await questionsAction();
  }

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
        </header>
        <Questions />
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
  email: PropTypes.string.isRequired,
  questionsAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  questionsAction: (e) => dispatch(fetchApiQuestions(e)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
