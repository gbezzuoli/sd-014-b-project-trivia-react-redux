import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchToken from '../services/token';
import { fetchQuestion } from '../redux/actions';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      results: {},
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    // this.setState({
    //   loading: true,
    // });
    const { fetchQuestionsDispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    await fetchQuestionsDispatch(token.token);
    const { questionsObj } = this.props;
    const ERROR_CODE = 3;
    if (questionsObj.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      const newToken = await fetchToken();
      localStorage.setItem('token', JSON.stringify(newToken));
      await fetchQuestionsDispatch(newToken.token);
    }
    this.setState({
      loading: false,
      results: questionsObj,
    });
  }

  render() {
    // const { questionsObj } = this.props;
    const { loading, results } = this.state;
    // const r = questionsObj.results;
    // const array = [...r];
    // console.log(array);
    const pagina = (
      <div>
        <Header />
        <h1>Jogo</h1>
        <h3>{results.map((a) => <h1 key={ a.category }>{a.category}</h1>)}</h3>
      </div>);
    return (
      <div>
        {loading ? <h2>loading</h2> : pagina}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsDispatch: (token) => dispatch(fetchQuestion(token)),
});

const mapStateToProps = (state) => ({
  questionsObj: state.trivia.questions,
});

Jogo.propTypes = {
  fetchQuestionsDispatch: PropTypes.func.isRequired,
  questionsObj: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
