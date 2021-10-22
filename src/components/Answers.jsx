// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Loading from './Loading';

// class Answers extends Component {
//   constructor() {
//     super();

//     this.state = {
//       answerState: [],
//       answerStateIncorrect: [],
//       answerStateCorrect: '',
//       right: false,
//     };

//     this.screenAnswers = this.screenAnswers.bind(this);
//   }

//   componentDidMount() {
//     this.screenAnswers();
//   }

//   async screenAnswers() {
//     const { answers, index } = this.props;
//     console.log(answers[index]);
//     console.log(answers);
//     this.setState({
//       answerStateIncorrect: answers[index].incorrect_answers,
//     });
//   }

//   render() {
//     const { answers, index } = this.props;
//     const { answerStateIncorrect } = this.state;
//     // console.log(answerStateIncorrect);
//     // console.log(answers[index].correct_answer);
//     if (answers.length) {
//       console.log(answers);
//       return (
//         <div>
//           Respostas
//         </div>
//       );
//     }
//     return <Loading />;
//   }
// }

// Answers.propTypes = {
//   answers: PropTypes.isRequired,
//   index: PropTypes.number.isRequired,
// };

// const mapStateToProps = (state) => ({
//   answers: state.questions.questions,
// });

// export default connect(mapStateToProps)(Answers);
