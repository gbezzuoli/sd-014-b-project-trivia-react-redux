import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <div>
        Nasci
      </div>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(Game);
