import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../components/Button';
import RankingRows from '../components/RankingRows';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    return <Redirect to="/" />;
  }

  render() {
    const ranking = localStorage.getItem('ranking');
    return (
      <section>
        <div>
          { JSON.parse(ranking).map((rankingRow) => (
            <RankingRows
              key={ rankingRow.id }
              name={ rankingRow.name }
              picture={ rankingRow.picture }
              score={ rankingRow.score }
            />
          ))}
        </div>
        <Button
          id="btn-go-home"
          label="Início"
          onClick={ this.handleClick }
        />
      </section>
    );
  }
}

export default connect()(Ranking);

Ranking.propTypes = {

};

Ranking.defaultProps = {

};
