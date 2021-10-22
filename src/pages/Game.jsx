import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

export class Game extends Component {

  constructor() {
    super();

    this.state = {
      index: 0,
    }
  }

   componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }


  render() {
    const { receviQuestions } = this.props;
    const { index } = this.state;
    const haveData = receviQuestions.length > 0;
    if (haveData === false) {
      return(
        <span>Loading</span>
      )
    }
    return (
      <div>
        <p data-testid="question-category">{receviQuestions[index].category}</p>
        <p data-testid="question-text">{receviQuestions[index].question}</p>
        <p data-testid="correct-answer">{receviQuestions[index].correct_answer}</p>
        {receviQuestions[index].incorrect_answers.map((question, index) => {
          return (
            <div key={ index }>
              <p data-testid={`wrong-answer-${index}`}>{question}</p>
            </div>
        )
      })}
       {receviQuestions[index].incorrect_answers.map((question, index) => {
         return (
           <div key={ index }>
             <button type='button'>{question}</button>
           </div>
        )
      })}
      <button type='button'>{ receviQuestions[index].correct_answer }</button>
   </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(fetchQuestions(payload)),
})

const mapStateToProps = (state) => ({
   receviQuestions: state.gameReducer.questions,
 })

export default connect(mapStateToProps, mapDispatchToProps)(Game);



