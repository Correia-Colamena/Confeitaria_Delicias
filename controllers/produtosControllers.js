document.addEventListener('DOMContentLoaded', function() {
  function fetchData() {
    fetch('/product')
        .then(response => response.json())
        .then(produtos => {
            const container = document.getElementById('data-cotainer');
            container.innerHTML = '';

            produtos.forEach(produto => {
                const div = document.createElement('div');
                div.innerHTML = `<div class="produto">
                <img scr="" alt="${produto.nome}"> 
                <h3>Nome: ${produto.nome}</h3> 
                <p>Descriçao: ${produto.descricao}</p> 
                <p><strong>Preço:</strong> ${produto.preco}kz</p>
                    <button class="btn" onclick="(${produto.id})">Adicionar ao Carrinho</button>
                </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
  }

  
  function showpromocao() {
    fetch('/promover_produto')
        .then(response => response.json())
        .then(produtos => {
            const container = document.getElementById('prom');
            container.innerHTML = '';

            produtos.forEach(produto => {
                const div = document.createElement('div');
                div.innerHTML = `<div class="produto">
                <img scr="" alt="${produto.nome}"> 
                <h3>Nome: ${produto.nome}</h3> 
                <p>Descriçao: ${produto.descricao}</p> 
                <p><strong>Preço:</strong> ${produto.preco}kz</p>
                <p><strong>Preço Promocional:</strong> ${produto.preco_promocional}kz</p>
                <p><strong>Desconto(%):</strong> ${produto.promocao}%</p>
                    <button class="btn" onclick="(${produto.id})">Adicionar ao Carrinho</button>
                </div>`;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
  }

  const XHR = new XMLHttpRequest()


    //adim-prod
    function fetchDataAd() {
        fetch('/product')
            .then(response => response.json())
            .then(produtos => {
                const container = document.getElementById('prod');
                container.innerHTML = '';

                produtos.forEach(produto => {
                    const div = document.createElement('div');
                    div.innerHTML = `<div class="produto">
                    <img scr="" alt="${produto.nome}"><h5>ID: ${produto.id}</h5> <h3>Nome: ${produto.nome}</h3> <p>Descriçao: ${produto.descricao}</p> <p><strong>Preço:</strong> ${produto.preco}</p>
                        <button class="btn" onclick="deleteItem(${produto.id})">Apagar</button>
                    </div>
                    `;
                    container.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    fetchData();
    fetchDataAd();
    showpromocao();

    document.getElementById('promover_produto').addEventListener('submit', function(e){
      e.preventDefault();
      const id = document.getElementById('id-promover').value;
      const desconto = document.getElementById('desconto').value;
  
      fetch(`http://localhost:8080/promover_produto/${id}/${desconto}`)
    })
    // Função para criar um novo item
    document.getElementById('create-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('create-nome').value;
        const descricao = document.getElementById('create-descricao').value;
        const preco = document.getElementById('create-preco').value;

        fetch('/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome, descricao, preco })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto criado:', data);
          fetchData();
        })
        .catch(error => console.error('Erro ao criar item:', error));
      });

      // Função para atualizar um item existente
      document.getElementById('update-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('update-id').value;
        const nome = document.getElementById('update-nome').value;
        const descricao = document.getElementById('update-descricao').value;
        const preco = document.getElementById('update-preco').value;

        fetch(`/product/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome, descricao, preco })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto atualizado:', data);
          fetchData();
        })
        .catch(error => console.error('Erro ao atualizar item:', error));
      });

      // Função para apagar um item
      window.deleteItem = function(id) {
        fetch(`/product/${id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto apagado:', data);
          fetchData(); // Atualizar os dados após a exclusão
        })
        .catch(error => console.error('Erro ao apagar produto:', error));
      }      

      document.getElementById('despromover').addEventListener('click', function(e) {
        e.preventDefault();

        const id = document.getElementById('id-despromover').value;

        fetch(`/remover_promocao/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Promoção removida:', data);
          fetchData();
        })
        .catch(error => console.error('Erro ao despromover produto:', error));

      })
      
    
});