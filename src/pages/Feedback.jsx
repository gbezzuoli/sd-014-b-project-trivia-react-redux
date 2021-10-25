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
      </>
    );
  }
}

export default Feedback;
