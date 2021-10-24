import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameQuestions from './GameQuestions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      src: '',
      arrayGame: [],
      loading: true,
      counter: 0,
    };

    this.srcGenerator = this.srcGenerator.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
  }

  componentDidMount() {
    this.srcGenerator();
    const tokenKey = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${tokenKey}`)
      .then((r) => r.json())
      .then(({ results }) => {
        this.setState({ arrayGame: [...results], loading: false });
      });
  }

  srcGenerator() {
    const { userEmail } = this.props;

    const hash = md5(userEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      src,
    });
  }

  handleCounter() {
    const { counter } = this.state;
    const LAST_NUMBER_COUNTER = 4;
    if (counter === LAST_NUMBER_COUNTER) {
      this.setState({ counter: 0 });
    } else {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));
    }
  }

  render() {
    const { src, loading, counter, arrayGame } = this.state;
    const { userName, userEmail } = this.props;
    if (loading) return <h1>Carregando...</h1>;
    return (
      <section>
        <Header userName={ userName } userEmail={ userEmail } src={ src } />
        <h1 data-testid="question-category">{ arrayGame[counter].category }</h1>
        <p data-testid="question-text">{ arrayGame[counter].question }</p>
        <GameQuestions
          key="correct"
          questions={ arrayGame[counter].correct_answer }
          idQuestions={ 5 }
        />
        { arrayGame[counter].incorrect_answers
          .map((element, index) => (<GameQuestions
            key={ index }
            questions={ element }
            idQuestions={ index }
          />))}
        <br />
        <br />
        <button type="button" onClick={ this.handleCounter }>Proximo</button>
      </section>
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
