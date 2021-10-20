import React from 'react';
import { connect } from 'react-redux';

class Config extends React.Component {
  render() {
    return (
      <div>
        Nasci
      </div>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(Config);
