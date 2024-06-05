document.addEventListener('DOMContentLoaded', function() {
    function fetchData() {
        fetch('/contact')
            .then(response => response.json())
            .then(contatos => {
                const container = document.getElementById('informacoes-contato');
                container.innerHTML = '';

                contatos.forEach(contato => {
                    const div = document.createElement('div');
                    div.innerHTML = `<div class="informacao">
                    <h3>Endereço: ${contato.endereco}</h3> <p>Telefone: ${contato.telefone}</p> <p>Email: ${contato.email}</p>
                    </div>
                    `;
                    container.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    //adim-contact
    function fetchDataAd() {
        fetch('/contact')
            .then(response => response.json())
            .then(contatos => {
                const container = document.getElementById('contato');
                container.innerHTML = '';

                contatos.forEach(contato => {
                    const div = document.createElement('div');
                    div.innerHTML = `<div class="contato">
                    <h5>ID: ${contato.id}</h5> <h3>Endereço: ${contato.endereco}</h3> <p>Telefone: ${contato.telefone}</p> <p>Email: ${contato.email}</p>
                        <button class="btn" onclick="deleteItem(${contato.id})">Apagar</button>
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
    document.getElementById('add').addEventListener('click', function(e) {
        e.preventDefault();
        const endereco = document.getElementById('create-endereco').value;
        const telefone = document.getElementById('create-telefone').value;
        const email = document.getElementById('create-email').value;

        fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ endereco, telefone, email })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Contato adicionado:', data);
          fetchData();
        })
        .catch(error => console.error('Erro ao criar item:', error));
      });

      // Função para atualizar um item existente
      document.getElementById('update-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('update-id').value;
        const endereco = document.getElementById('update-endereco').value;
        const telefone = document.getElementById('update-telefone').value;
        const email = document.getElementById('update-email').value;

        fetch(`/contact/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ endereco, telefone, email })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Contato atualizado:', data);
          fetchData();
        })
        .catch(error => console.error('Erro ao atualizar contato:', error));
      });

      // Função para apagar um item
      window.deleteItem = function(id) {
        fetch(`/contact/${id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          console.log('Contato apagado:', data);
          fetchData();
        })
        .catch(error => console.error('Erro ao apagar contato:', error));
      }
});