import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepositories();
  }, []);

  async function loadRepositories() {
    try {
      const response = await api.get('/repositories');

      setRepositories(response.data);
    } catch(err) {
      alert('Erro ao trazer os repositórios');
    }
  }

  async function handleAddRepository() {
    const repository = {
      title: `Repositorio ${new Date()}`,
      url: 'http://www.rocketseat.com.br',
      techs: 'teste',
    };

    try {
      await api.post('/repositories', repository);

      setRepositories([...repositories, repository]);

    } catch(err) {
      alert('Erro ao cadastrar um repositório');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      loadRepositories();

    } catch(err) {
      alert('Erro ao deletar um repositório');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
