import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    return (
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </section>
    );
  }
}

export default connect()(Ranking);
