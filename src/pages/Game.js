import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkQuestions } from '../actions';
import AlternativeCard from '../components/AlternativeCard';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
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

    this.setState({
      loading: false,
    });
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
    const { loading, controller } = this.state;
    const { timeIsOver } = this.props;
    return (
      <>
        <Header />
        { loading ? <span>loading</span>
          : (
            <main style={ styles.main }>
              <QuestionCard controller={ controller } />
              <AlternativeCard controller={ controller } />
              <button onClick={ this.handleClick } type="button">Proxima</button>
              {timeIsOver ? <div>Timer: 0</div> : <Timer />}
            </main>)}
      </>
    );
  }
}

const mapStateToProps = ({ questionsReducer: { timeIsOver } }) => ({
  timeIsOver,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(thunkQuestions()),
});

Game.propTypes = {
  saveQuestions: PropTypes.func.isRequired,
  timeIsOver: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
