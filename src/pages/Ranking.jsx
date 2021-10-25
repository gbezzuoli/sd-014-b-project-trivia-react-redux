import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetUserScore } from '../redux/actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      rankings: [],
    };
  }

  componentDidMount() {
    this.getRank();
  }

  getRank() {
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ rankings });
  }

  goHome() {
    const { history, resetUser } = this.props;
    resetUser();
    history.push('/');
  }

  render() {
    const { rankings } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        { rankings.map((user, index) => (
          <div className="user-rank" key={ index }>
            <img src={ user.picture } alt="" />
            <p data-testid={ `player-name-${index}` }>{ user.name }</p>
            <p data-testid={ `player-score-${index}` }>{ user.score }</p>
          </div>
        )) }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.goHome() }
        >
          Volta para a tela inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  resetUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetUser: () => dispatch(resetUserScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
