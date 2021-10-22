import React from 'react';
import { connect } from 'react-redux';
import { resultAsk, resultAvatar } from '../actions/actionTypes';
import CardGame from '../components/CardGame';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatchAskGame, email, getAvatar } = this.props;
    getAvatar(email);
    dispatchAskGame();
  }

  handleClick() {
    this.setState((prevState) => ({ index: prevState.index + 1 }));
  }

  render() {
    const { question, name, avatar } = this.props;
    const { index } = this.state;
    console.log(question);
    if (!question) {
      return <h1>Loading ...</h1>;
    }
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ avatar }
            alt="Imagem de Avatar"
          />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{`Pontos: ${0}`}</span>
        </header>

        <div>
          <CardGame
            index={ index }
            onClick={ this.handleClick }
            questions={ question }
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  avatar: state.userReducer.avatar,
  question: state.gameReducer.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (email) => dispatch(resultAvatar(email)),
  ispatchAskGame: () => dispatch(resultAsk()),
});

GamePage.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
