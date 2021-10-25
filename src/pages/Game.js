import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkQuestions, timeIsOver as timeIsOverAction } from '../actions';
import AlternativeCard from '../components/AlternativeCard';
import ButtonNext from '../components/ButtonNext';
import Header from '../components/Header';
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
    const { timeIsOverDispatch, history } = this.props;
    this.setState({
      controller: controller + 1,
    });
    if (controller === MIN_LENGTH) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const { player } = JSON.parse(localStorage.getItem('state'));
      if (!ranking) {
        console.log('entrou');
        localStorage.setItem('ranking', JSON.stringify({
          players: [player],
        }));
      } else {
        const players = [...ranking.players, player];
        localStorage.setItem('ranking', JSON.stringify({ players }));
      }
      history.push('/feedback');
    }
    timeIsOverDispatch(false);
  }

  render() {
    const styles = {
      main: {
        display: 'flex',
        justifyContent: 'space-around',
      },
    };

    const { controller } = this.state;
    const { loading, timeIsOver, counter } = this.props;
    return (
      <>
        <Header />
        { loading ? <span>loading</span>
          : (
            <main style={ styles.main }>
              <QuestionCard controller={ controller } />
              <AlternativeCard controller={ controller } />
              { timeIsOver && <ButtonNext
                handleClick={ this.handleClick }
              /> }
              {timeIsOver ? `timer: ${counter}` : <Timer />}
            </main>)}
      </>
    );
  }
}

const mapStateToProps = ({ questionsReducer: { loading, timeIsOver, counter } }) => ({
  loading,
  timeIsOver,
  counter,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(thunkQuestions()),
  timeIsOverDispatch: (timeOver) => dispatch(timeIsOverAction(timeOver)),
});

Game.propTypes = {
  saveQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  timeIsOver: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  timeIsOverDispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
