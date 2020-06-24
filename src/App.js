import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(()=> {
    api.get('repositories').then(
      response => {
        setRepositories(response.data);
      });
  },[]);


  async function handleAddRepository() {
    try{
      api.post('repositories', {
        title: `Novo Projeto ${Date.now()}`,
        url: 'https://github.com/julianotavares/gostack-desafio-conceitos-reacjs',
        techs: ["React JS"]
      }).then(
        response => {
          const repository = response.data
          setRepositories([...repositories, repository]);
        });
    } catch (e){
      console.log(e);
    }
    
  }

  async function handleRemoveRepository(id) {
    
    try{
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (e){
      console.log(e);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
        <li key={repository.id}>
          <h2>
          {repository.title}
          </h2>
          
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;