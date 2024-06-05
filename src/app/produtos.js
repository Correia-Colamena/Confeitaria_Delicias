import app from "../server.js";
import e from "express";
import conexao from "../conexao.js";
import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(e.json());


// Criar um novo produto
app.post('/product', (req, res) => {
    const { nome, descricao, preco } = req.body;
    const query = 'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)';
    conexao.query(query, [nome, descricao, preco], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, nome, descricao, preco });
    });
});

// Obter todos os produtos
app.get('/product', (req, res) => {
    const query = 'SELECT * FROM produtos';
    conexao.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(results);
    });
});


// Obter um produto pelo ID
app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM produtos WHERE id = ?';
    conexao.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.send(result[0]);
    });
});

// Atualizar um produto
app.put('/product/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
    conexao.query(query, [nome, descricao, preco, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.send({ id, nome, descricao, preco });
    });
});

// Deletar um produto
app.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE id = ?';
    conexao.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.send({ id });
    });
});
