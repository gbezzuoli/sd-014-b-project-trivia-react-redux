import PropTypes from 'prop-types';
import React from 'react';

class FeedbackText extends React.Component {
  constructor() {
    super();

    this.state = {
      message: '',
    };

    this.setMessageInState = this.setMessageInState.bind(this);
  }

  componentDidMount() {
    this.setMessageInState();
  }

  setMessageInState() {
    const numberMinHits = 3;
    const { numberHits } = this.props;

    if (numberHits < numberMinHits) {
      this.setState({
        message: 'Podia ser melhor...',
      });
    } else {
      this.setState({
        message: 'Mandou bem!',
      });
    }
  }

  render() {
    const { message } = this.state;
    const { numberHits, totalScore } = this.props;

    return (
      <>
        <section>
          <h4 data-testid="feedback-text">{`${message}`}</h4>
        </section>
        <section>
          <h4>
            Total de pontos:
            {' '}
            <span data-testid="feedback-total-score">{totalScore}</span>
          </h4>
        </section>
        <section>
          {numberHits ? (
            <h4>
              Acertou
              {' '}
              <span data-testid="feedback-total-question">{numberHits}</span>
              {' '}
              perguntas
            </h4>
          ) : (
            <h4 data-testid="feedback-total-question">Não acertou nenhuma pergunta</h4>
          )}
        </section>
      </ >
    );
  }
}

FeedbackText.propTypes = {
  numberHits: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

export default FeedbackText;
