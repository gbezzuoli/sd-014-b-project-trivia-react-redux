import React from 'react';
import { connect } from 'react-redux';

class Config extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configuração</h1>
      </div>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(Config);
