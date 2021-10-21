import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Game extends Component {
  render() {
    return (
      <section>
        <Header />
      </section>
    );
  }
}

export default connect()(Game);
