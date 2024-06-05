require('dotenv').config();
import app from "../server";
import conexao from "../conexao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

const SECRET_KEY = 'secret-key-segura'; // Chave secreta para JWT

// Middleware de autenticação
function authenticateToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).send('Acesso negado.');

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Token inválido.');
    }
}

// Cadastro de usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    conexao.query(query, [nome, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, nome, email });
    });
});

// Login de usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    conexao.query(query, [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(400).send('Email ou senha incorretos.');

        const user = results[0];
        const validPassword = await bcrypt.compare(senha, user.senha);
        if (!validPassword) return res.status(400).send('Email ou senha incorretos.');

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    });
});

// Obter informações do usuário
app.get('/usuarios/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, nome, email FROM usuarios WHERE id = ?';
    conexao.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Usuário não encontrado.');
        res.send(results[0]);
    });
});

// Atualizar informações do usuário
app.put('/usuarios/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const query = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
    conexao.query(query, [nome, email, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id, nome, email });
    });
});

// Deletar conta do usuário
app.delete('/usuarios/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    conexao.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id });
    });
});

// Obter histórico de encomendas
app.get('/historico/:user_id', authenticateToken, (req, res) => {
    const { user_id } = req.params;
    const query = `
        SELECT h.id, p.nome, p.descricao, p.preco, h.quantidade, h.data_compra
        FROM historico h
        JOIN produtos p ON h.produto_id = p.id
        WHERE h.user_id = ?
    `;
    conexao.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});