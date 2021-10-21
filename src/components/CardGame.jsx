import React from 'react';

class CardGame extends React.Component {
  constructor() {
    super();

    this.state = {
      respostas: 
      
    }
  }

  render() {
    const { question: { category, question }} = this.props;

    return (
      <div>
       <h2>{category}</h2>
       <h3>{question}</h3>

  <div>
    
  </div>
      </div>
    );
  }
}


export default CardGame;
