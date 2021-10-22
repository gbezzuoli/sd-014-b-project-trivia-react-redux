import React, { Component } from 'react';

export default class QuestionsTrivia extends Component {
  render() {
    const { question } = this.props;
    return (
      <main>
        <section>
          <p data-testid="question-category" />
          <p data-testid="question-text" />
        </section>
        {/* <section>
          <button value={ correct_answer } />
          <button value={ incorrect_answer[0] } />
          <button value={ incorrect_answer[1] } />
          <button value={ incorrect_answer[2] } />
        </section> */}
      </main>
    );
  }
}
