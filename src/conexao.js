import mysql from 'mysql';

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_confeitaria'
});

conexao.connect();

export default conexao;