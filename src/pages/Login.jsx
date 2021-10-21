import React, { useState } from 'react';

export default function Login() {
  const [state, setState] = useState({ name: '', email: '' });
  const { name, email } = state;
  const disabled = !(name && email);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState({ ...state, [id]: value });
  };

  return (
    <main>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            placeholder="Digite o seu nome"
            value={ name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            id="email"
            placeholder="email@email.com"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <button data-testid="btn-play" disabled={ disabled } type="button">
          Jogar
        </button>
      </form>
    </main>
  );
}
