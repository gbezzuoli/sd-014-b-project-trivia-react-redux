import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkQuestions } from '../actions';
import AlternativeCard from '../components/AlternativeCard';
import GoRankingButton from '../components/GoRankingButton';
import ButtonNext from '../components/ButtonNext';
import Header from '../components/Header';
import PlayAgainButton from '../components/PlayAgainButton';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

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
    const { loading, timeIsOver, history } = this.props;
    return (
      <>
        <Header />
        { loading ? <span>loading</span>
          : (
            <main style={ styles.main }>
              <QuestionCard controller={ controller } />
              <AlternativeCard controller={ controller } />
              { timeIsOver && <ButtonNext handleClick={ this.handleClick } /> }
              <Timer />
            </main>)}
        <PlayAgainButton history={ history } />
        <GoRankingButton history={ history } />
      </>
    );
  }
}

const mapStateToProps = ({ questionsReducer: { loading, timeIsOver } }) => ({
  loading,
  timeIsOver,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(thunkQuestions()),
});

Game.propTypes = {
  saveQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  timeIsOver: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
