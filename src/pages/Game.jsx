import React from 'react';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      asks: [],
    };

    this.requestTrivia = this.requestTrivia.bind(this);
  }

  async componentDidMount() {
    await this.requestTrivia();
  }

  async requestTrivia() {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({ asks: data.results });
  }

  render() {
    return <div>Game page</div>;
  }
}
