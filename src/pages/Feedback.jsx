import React from 'react';
import Header from '../components/Header/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {},
      loading: true,
    };
    this.saveState = this.saveState.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));

    if (player) {
      this.saveState(player);
    }
  }

  saveState(player) {
    this.setState({ player, loading: false });
  }

  render() {
    const { player, loading } = this.state;
    const magicNumber = 3;
    return (
      <>
        <Header />
        <div>
          <h3 data-testid="feedback-text">
            { !loading && player.assertions < magicNumber
              ? 'Podia ser melhor...' : 'Mandou bem!' }
          </h3>
        </div>
        <div>
          <h3>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{player.assertions}</span>
            {' '}
            questões!
          </h3>
          <h3>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{player.score}</span>
            {' '}
            pontos
          </h3>
        </div>
      </>
    );
  }
}

export default Feedback;
