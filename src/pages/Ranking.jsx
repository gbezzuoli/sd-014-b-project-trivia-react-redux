import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = { redirect: false };

    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.createRankingElements = this.createRankingElements.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleLocalStorage() {
    const {
      location: { state: { userObject } },
    } = this.props;

    let output = [];

    if ('ranking' in localStorage) {
      output = userObject;
      localStorage.setItem('ranking', JSON.stringify([output]));
    } else {
      const savedRanking = JSON.parse(localStorage.getItem('ranking'));
      const increasedRanking = [...savedRanking, userObject];
      const sortedRanking = increasedRanking.sort((a, b) => b.score - a.score);
      output = sortedRanking;
      localStorage.setItem('ranking', JSON.stringify(output));
    }

    return output;
  }

  createRankingElements(rankingArray) {
    return rankingArray.map(({ name, score, gravatarImage }, index) => (
      <div key={ index }>
        <img src={ gravatarImage } alt={ name } />
        <h3 data-testid={ `player-name-${index}` }>{ name }</h3>
        <p data-testid={ `player-score-${index}` }>{ score }</p>
      </div>
    ));
  }

  handleClick() {
    this.setState({ redirect: true });
  }

  render() {
    const {
      state: { redirect },
      createRankingElements, handleLocalStorage, handleClick,
    } = this;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        { createRankingElements(handleLocalStorage()) }
        <button type="button" onClick={ handleClick } data-testid="btn-go-home">
          Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  userObject: PropTypes.object,
}.isRequired;

export default Ranking;
