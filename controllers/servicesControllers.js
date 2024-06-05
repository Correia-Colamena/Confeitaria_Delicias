document.addEventListener('DOMContentLoaded', function() {
    function fetchData() {
        fetch('/services')
            .then(response => response.json())
            .then(servicos => {
                const container = document.getElementById('servico');
                container.innerHTML = '';

                servicos.forEach(servico => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                    <div class="descricao">
                        <h3>${servico.titulo}</h3>
                        <p>${servico.descricao}</p>
                    </div>
                    <div class="aderir">
                        <img src="../../public/img/assinatura.jpg" alt="${servico.titulo}"><br>
                        <button>Aderir</button>
                    </div>
                    `;
                    container.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    //adim-prod
    function fetchDataAd() {
        fetch('/services')
            .then(response => response.json())
            .then(servicos => {
                const container = document.getElementById('data-container');
                container.innerHTML = '';

                servicos.forEach(servico => {
                    const div = document.createElement('div');
                    div.innerHTML = `<div class="servico">
                    <img scr="" alt="${servico.titulo}"><h5>ID: ${servico.id}</h5> <h3>Nome: ${servico.titulo}</h3> <p>Descriçao: ${servico.descricao}</p> <p><strong>Preço:</strong> ${servico.preco}</p>
                        <button class="btn" onclick="deleteItem(${servico.id})">Apagar</button>
                    </div>
                    `;
                    container.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    fetchData();
    fetchDataAd();

    // Função para criar um novo item
    document.getElementById('create-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const titulo = document.getElementById('create-nome').value;
        const descricao = document.getElementById('create-descricao').value;

        fetch('/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ titulo, descricao })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto criado:', data);
          fetchData(); // Atualizar os dados após a criação
        })
        .catch(error => console.error('Erro ao criar item:', error));
      });

      // Função para atualizar um item existente
      document.getElementById('update-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('update-id').value;
        const titulo = document.getElementById('update-nome').value;
        const descricao = document.getElementById('update-descricao').value;

        fetch(`/services/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ titulo, descricao })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto atualizado:', data);
          fetchData(); // Atualizar os dados após a atualização
        })
        .catch(error => console.error('Erro ao atualizar item:', error));
      });

      // Função para apagar um item
      window.deleteItem = function(id) {
        fetch(`/services/${id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto apagado:', data);
          fetchData(); // Atualizar os dados após a exclusão
        })
        .catch(error => console.error('Erro ao apagar produto:', error));
      }
});