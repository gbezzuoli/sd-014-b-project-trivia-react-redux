import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <header>
        algo aqui
      </header>
    );
  }
}

export default connect(null, mapStateToProps)(Header);
