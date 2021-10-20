import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      // estado,
    };
  }

  getPlayersFromLocalStore() {

  }

  render() {
    return (
      <main>
        <p>Ranking</p>
      </main>
    );
  }
}

const mapStateToProps = () => ({ // Adicionar state ao parâmetro.
  // estado com (provavelmente) o array de players e suas infos: state.REDUCER_JOGO(ou Player).PLAYERS,
});

export default connect(mapStateToProps, null)(Ranking);
