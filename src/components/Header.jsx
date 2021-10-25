import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchSrc } from '../redux/actions/srcGeneratorAction';

class Header extends Component {
  constructor() {
    super();

    this.srcGenerator = this.srcGenerator.bind(this);
  }

  componentDidMount() {
    this.srcGenerator();
  }

  srcGenerator() {
    const { userEmail, srcDispatch } = this.props;

    const hash = md5(userEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    srcDispatch(src);
  }

  render() {
    const {
      userName,
      userEmail,
      src,
    } = this.props;
    return (
      <header>
        <img src={ src } alt="Gravatar Avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">
          { userName }
        </p>
        <p>
          { userEmail }
        </p>
        <p data-testid="header-score">
          0
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userReducer.name,
  userEmail: state.userReducer.email,
  src: state.srcReducer.src,
});

const mapDispatchToProps = (dispatch) => ({
  srcDispatch: (src) => dispatch(dispatchSrc(src)),
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
