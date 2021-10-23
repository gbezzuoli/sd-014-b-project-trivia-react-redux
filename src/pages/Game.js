import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkQuestions } from '../actions';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import AlternativeCard from '../components/AlternativeCard';
import PlayAgainButton from '../components/PlayAgainButton';
import GoRankingButton from '../components/GoRankingButton';

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
        {loading ? (
          <span>loading</span>
        ) : (
          <main style={ styles.main }>
            <QuestionCard controller={ controller } />
            <AlternativeCard controller={ controller } />
            <button onClick={ this.handleClick } type="button" data-testid="btn-next">
              Proxima
            </button>
            {timeIsOver ? <div>Timer: 0</div> : <Timer />}
          </main>
        )}
        <PlayAgainButton history={ history } />
        <GoRankingButton history={ history } />
      </>
    );
  }
}

const mapStateToProps = ({ questionsReducer: { timeIsOver, loading } }) => ({
  timeIsOver,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(thunkQuestions()),
});

Game.propTypes = {
  saveQuestions: PropTypes.func.isRequired,
  timeIsOver: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
