import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkQuestions } from '../actions';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import AlternativeCard from '../components/AlternativeCard';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      controller: 0,
    };

    this.pageIsReady = this.pageIsReady.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.pageIsReady();
  }

  async pageIsReady() {
    const { saveQuestions } = this.props;
    await saveQuestions();
  }

  handleClick() {
    const MIN_LENGTH = 4;
    const { controller } = this.state;
    this.setState({
      controller: controller + 1,
    });
    if (controller === MIN_LENGTH) {
      this.setState({
        controller: 0,
      });
    }
  }

  render() {
    const styles = {
      main: {
        display: 'flex',
        justifyContent: 'space-around',
      },
    };
    const { controller } = this.state;
    const { loading } = this.props;
    return (
      <>
        <Header />
        { loading ? <span>loading</span>
          : (
            <main style={ styles.main }>
              <QuestionCard controller={ controller } />
              <AlternativeCard controller={ controller } />
              <button onClick={ this.handleClick } type="button">Proxima</button>
            </main>)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.questionsReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(thunkQuestions()),
});

Game.propTypes = {
  saveQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
