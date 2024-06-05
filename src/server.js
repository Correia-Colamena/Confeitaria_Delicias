import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import conexao from './conexao.js';

const rootDir = `C:/Users/PC/Documents/app-confeitaria/backend`
const PORTA = process.env.PORT || 8080;
const app = express();

let currentUserid = null;

app.set('views', path.join(rootDir, 'views'));
app.set('view engine', 'ejs');



app.use('/css', express.static('../../public/') );
app.use(express.static(rootDir))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.render('../views/home/index.ejs');
});

app.get('/login', (req, res) =>{
    res.render('../views/login/index.ejs');
});
app.get('/cadastro', (req, res) =>{
    res.render('../views/cadastro/index.ejs');
});
app.get('/servicos', (req, res) =>{
    res.render('../views/servicos/index.ejs');
});
app.get('/conta', (req, res) =>{
    res.render('../views/conta/index.ejs');
});
app.get('/carrinho', (req, res) =>{
    res.render('../views/carrinho/index.ejs');
});
app.get('/produtos', (req, res) =>{
    res.render('../views/produtos/index.ejs');
})

app.get('/contato', (req, res) =>{
    res.render('../views/contato/index.ejs');
});
app.get('/sobre', (req, res) =>{
    res.render('../views/sobre/index.ejs');
});
app.get('/adim-prod', (req, res) =>{
    res.render('./adim.ejs');
});
app.get('/adim-servico', (req, res) =>{
    res.render('./adim_services.ejs');
});
app.get('/adim-contato', (req, res) =>{
    res.render('./adim_contact.ejs');
});

//CRUD PRODUTOS
app.get('/product', (req, res) => {
    const query = 'SELECT * FROM produtos';
    conexao.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

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
// FIM CRUD PRODUTOS

//CRUD SERVICOS
app.get('/services', (req, res) => {
    const query = 'SELECT * FROM servicos';
    conexao.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

app.post('/services', (req, res) => {
    const { titulo, descricao } = req.body;
    const query = 'INSERT INTO servicos (titulo, descricao) VALUES (?,?)';
    conexao.query(query, [titulo, descricao], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, titulo, descricao });
    });
});

app.put('/services/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    const query = 'UPDATE servicos SET titulo = ?, descricao = ? WHERE id = ?';
    conexao.query(query, [titulo, descricao, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Serviço não encontrado');
        }
        res.send({ id, titulo, descricao });
    });
});

app.delete('/services/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM servicos WHERE id = ?';
    conexao.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Serviço não encontrado');
        }
        res.send({ id });
    });
});
//FIM CRUD SERVICOS

//CRUD CONTATO
app.get('/contact', (req, res) => {
    const query = 'SELECT * FROM contatos';
    conexao.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

app.post('/contact', (req, res) => {
    const { endereco, telefone, email } = req.body;
    const query = 'INSERT INTO contatos (endereco, telefone, email) VALUES (?, ?, ?)';
    conexao.query(query, [endereco, telefone, email], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, endereco, telefone, email });
    });
});

app.put('/contact/:id', (req, res) => {
    const { id } = req.params;
    const { endereco, telefone, email } = req.body;
    const query = 'UPDATE contatos SET endereco = ?, telefone = ?, email = ? WHERE id = ?';
    conexao.query(query, [endereco, telefone, email, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Contato não encontrado');
        }
        res.send({ id, endereco, telefone, email });
    });
});

app.delete('/contact/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM contatos WHERE id = ?';
    conexao.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Contato não encontrado');
        }
        res.send({ id });
    });
});
//FIM CRUD CONTATO


//Promoção
app.get('/promover_produto/:id/:desconto', (req, res) => {
    const { id, desconto } = req.params;
  
   const sql = `CALL promover_produto(?, ?);`;
  
    conexao.query(sql, [id, desconto], (err, results) => {
      if (err) {
        console.error('Erro ao chamar o procedimento:', err);
        return res.status(500).json({ error: 'Erro ao chamar o procedimento' });
      }  
      //res.status(200).json({ message: results[0] });
      res.send(results);
    });
});

app.get('/promover_produto', (req, res) => {
    const sql = 'SELECT * FROM produtos_em_promocao;';

    conexao.query(sql, (err, results) => {
        if(err) return res.json({err: 'Erro ao ver produtos em promoção'});
        res.send(results);
    });
});

app.get('/remover_promocao/:id', (req, res) => {
    const { id } = req.params;
  
    const sql = `CALL remover_promocao(?)`;
  
    conexao.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Erro ao chamar o procedimento:', err);
        return res.status(500).json({ error: 'Erro ao chamar o procedimento' });
      }
      res.status(200).json({ message: 'Promoção removida com sucesso' });
    });
});
//Fim promoção

//CRUD USUARIO

//Cadastro
app.get('/cadastro-user/:nome/:email/:senha', (req, res) => {
    const {nome, email, senha} = req.params;
    conexao.query('INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?);',[nome, email, senha], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
          }
          
        res.status(200).json({ message: 'Cadastro bem-sucedido' });
    });
});
  
  //login
  app.get('/login-user/:email/:senha', (req, res) => {
    const { email, senha } = req.params;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

    conexao.query(query, [email, senha], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }

        if (results.length > 0) {
            currentUserid = results[0].id; // Supondo que o ID do usuário está no campo 'id'
            res.redirect('/');
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});

  
  //Editar Conta
  app.get('/update-user/:id/:nome/:email/:senha', (req, res) => {
    
    const {id, nome, email, senha} = req.params;
    const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
  
    conexao.query(query, [nome, email, senha, id], (error, results) => {
      if (error) {
        console.error('Error executing query', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
      }    
      res.json({ message: 'Atualizado com sucesso' });
    });
  
  });
  
  //Eliminar conta
  app.get('/delete-user/:id', (req, res) => {
    
    const {id} = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
  
    conexao.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error executing query', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
      }    
      res.json({ message: 'Eliminado com sucesso' });
    });
  
  });

  //INFORMAÇÂO
app.get('/informacoes', (req, res) => {

    const query = 'SELECT * FROM usuarios WHERE id = ?';

    conexao.query(query, currentUserid, (error, result) => {
        if(error){
            console.log('Erro:', error)
            return res.status(500).json({error: 'Erro no servidor'})
        }
        res.send(result)
    })
})

app.get('/logout', (req, res) =>{
    currentUserid = 0
    res.json({mensagem: true})
});

//FIM CRUD USUARIO

app.listen(PORTA, () =>{
    console.log(`Servidor rodando na porta: http://localhost:${PORTA}`);
});

export default app;