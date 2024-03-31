// src/components/Forms/CadastroFormulario.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importando o useHistory para redirecionamento

const CadastroFormulario = () => {
  // Estado para armazenar os valores dos campos do formulário de cadastro
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  // Função para lidar com a mudança nos campos do formulário de cadastro
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Histórico de navegação para redirecionamento
  const history = useHistory();

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para lidar com os dados do formulário de cadastro, como enviar para um servidor, etc.
    console.log(formData);
    // Após lidar com os dados do formulário, redirecione para outra página (por exemplo, página de sucesso)
    history.push('/sucesso'); // Redirecionamento para a página de sucesso (você precisa definir a rota '/sucesso' em seu aplicativo React Router)
  };

  return (
    <div>
      <h2>Formulário de Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroFormulario;
