import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Settings extends Component {
  render() {
    return (
      <section>
        <h2 data-testid="settings-title">Settings</h2>
        <Link to="/settings" data-testid="btn-settings">Settings</Link>
      </section>
    );
  }
}

export default Settings;
