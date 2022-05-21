const express = require('express');
const app = express();
const port = 3500;

app.use(express.json());

let produtos = [];

app.get('/resposta', (request, response) => {
    return response.json({produtos})
});

app.post('/requisicao', (request, response) => {
    const produto = request.body
    produtos.push(produto)
    return response.send("Produto cadastrado!")
});

app.put('/atualizacao', (request, response) => {
    const { id, nome, valor } = request.body;
    const produtoId = produtos.findIndex((prod) => prod.nome === nome)
    produtos[produtoId] = {
        id: id,
        nome: nome,
        valor: valor
    }
    return response.json({produtos});
});

app.delete('/exclusao', (request, response) => {
    const { id } = request.body;
    const produtoId = produtos.findIndex((prod) => prod.id === id);
    produtos.splice(produtoId, 1)
    return response.json({message: "Id do produto deletado com sucesso!", produto: id})
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});