import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlternativeCard from '../components/AlternativeCard';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { thunkQuestions } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };

    this.pageIsReady = this.pageIsReady.bind(this);
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

  render() {
    const styles = {
      main: {
        display: 'flex',
        justifyContent: 'space-around',
      },
    };
    const { loading } = this.state;
    return (
      <>
        <Header />
        { loading ? <span>loading</span>
          : <main style={ styles.main }>
            <QuestionCard />
            <AlternativeCard />
          </main>}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(thunkQuestions()),
});

export default connect(null, mapDispatchToProps)(Game);
