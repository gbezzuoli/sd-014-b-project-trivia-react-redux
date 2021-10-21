import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { login, fetchToken } from '../redux/slices/userSlice';
import Login from '../components/Login';

export default function Home({ history }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ name: '', email: '' });
  const { name, email } = state;
  const disabled = !(name && email);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = () => {
    dispatch(login(state));
    dispatch(fetchToken());
    history.push('/game');
  };

  const switchToSettings = () => {
    history.push('/settings');
  };

  return (
    <main>
      <Login
        state={ state }
        disabled={ disabled }
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
      />
      <button
        data-testid="btn-settings"
        type="button"
        onClick={ switchToSettings }
      >
        Configurações
      </button>
    </main>
  );
}

Home.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
