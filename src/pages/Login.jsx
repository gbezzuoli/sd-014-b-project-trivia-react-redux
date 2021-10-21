import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { login, fetchToken } from '../redux/slices/userSlice';
import LoginForm from '../components/LoginForm';

export default function Login(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ name: '', email: '' });
  const { name, email } = state;
  const disabled = !(name && email);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = () => {
    const { history } = props;
    dispatch(login(state));
    dispatch(fetchToken());
    history.push('/game');
  };

  return (
    <main>
      <LoginForm
        state={ state }
        disabled={ disabled }
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
      />
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
