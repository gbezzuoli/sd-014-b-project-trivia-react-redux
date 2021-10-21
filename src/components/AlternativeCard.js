import React, { Component } from 'react';

class AlternativeCard extends Component {
  render() {
    
    return (
      <section>
        <div data-testid="question-category">
          Categoria
        </div>
        <div data-testid="question-text">
          Pergunta
        </div>
      </section>
    );
  }
}

export default AlternativeCard;
