import app from "../server";
import conexao from "../conexao";
import bodyParser from "body-parser";

app.use(bodyParser.json());



// Adicionar item ao carrinho
app.post('/carrinho', (req, res) => {
    const { user_id, produto_id, quantidade } = req.body;
    const query = 'INSERT INTO carrinho (user_id, produto_id, quantidade) VALUES (?, ?, ?)';
    conexao.query(query, [user_id, produto_id, quantidade], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, user_id, produto_id, quantidade });
    });
});

// Obter itens do carrinho de um usuário
app.get('/carrinho/:user_id', (req, res) => {
    const { user_id } = req.params;
    const query = `
        SELECT c.id, p.nome, p.descricao, p.preco, c.quantidade, (p.preco * c.quantidade) AS total_preco
        FROM carrinho c
        JOIN produtos p ON c.produto_id = p.id
        WHERE c.user_id = ?
    `;
    conexao.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

// Atualizar quantidade de um item no carrinho
app.put('/carrinho/:id', (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;
    const query = 'UPDATE carrinho SET quantidade = ? WHERE id = ?';
    conexao.query(query, [quantidade, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ id, quantidade });
    });
});

// Remover item do carrinho
app.delete('/carrinho/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM carrinho WHERE id = ?';
    conexao.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ id });
    });
});

