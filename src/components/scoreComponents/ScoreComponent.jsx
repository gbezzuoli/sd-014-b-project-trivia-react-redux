import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreComponent extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <section>
        <p data-testid="header-score">
          Sua pontuçao foi de:
          { ' ' }
          {
            score.length > 0
              ? score.reduce((prev, curr) => prev + curr, 0)
              : 0
          }
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.userInfo.name,
  score: state.game.clickedTimes,
});

ScoreComponent.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number),
}.isRequired;

export default connect(mapStateToProps)(ScoreComponent);
