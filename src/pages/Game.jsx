import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      src: '',
    };

    this.srcGenerator = this.srcGenerator.bind(this);
  }

  componentDidMount() {
    this.srcGenerator();
  }

  srcGenerator() {
    const { userEmail } = this.props;

    const hash = md5(userEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      src,
    });
  }

  render() {
    const { src } = this.state;
    const { userName, userEmail } = this.props;
    return (
      <Header userName={ userName } userEmail={ userEmail } src={ src } />
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userReducer.name,
  userEmail: state.userReducer.email,
});

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
