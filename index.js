const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'senha-misteriosa';

let tenis = [
  {
    id: 1,
    nome: 'Nike Air Max 270',
    preco: 599.90,
    tamanho: [39, 40, 41, 42, 43],
    cor: 'Preto',
    quantidadeEstoque: 50,
    descricao: 'Tênis confortável para corrida e uso diário.'
  },
  {
    id: 2,
    nome: 'Adidas Ultra Boost',
    preco: 799.90,
    tamanho: [40, 41, 42, 43],
    cor: 'Branco',
    quantidadeEstoque: 40,
    descricao: 'Tênis de alta performance com conforto extremo.'
  },
  {
    id: 3,
    nome: 'Puma RS-X³',
    preco: 499.90,
    tamanho: [38, 39, 40, 41],
    cor: 'Azul',
    quantidadeEstoque: 30,
    descricao: 'Design futurista e confortável.'
  },
  {
    id: 4,
    nome: 'Reebok Classic Leather',
    preco: 399.90,
    tamanho: [37, 38, 39, 40],
    cor: 'Cinza',
    quantidadeEstoque: 25,
    descricao: 'Tênis casual com estilo clássico.'
  },
  {
    id: 5,
    nome: 'New Balance 990v5',
    preco: 899.90,
    tamanho: [42, 43, 44],
    cor: 'Cinza Claro',
    quantidadeEstoque: 15,
    descricao: 'Tênis de alto desempenho, ideal para corridas longas.'
  }
];

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'admin' && senha === '1234') {
    const token = jwt.sign({ usuario }, SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.json({
      mensagem: 'Login executado com sucesso!',
      token,
    });
  }

  res.status(401).json({
    mensagem: 'Usuário ou senha inválidos.',
  });
});

const autenticarToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      mensagem: "Token não encontrado.",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        mensagem: "Token inválido",
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

app.get('/produtos', autenticarToken, (req, res) => {
  res.json(tenis);
});

app.post("/produtos", autenticarToken, (req, res) => {
  const novoTenis = req.body;
  novoTenis.id = tenis.length + 1;
  tenis.push(novoTenis);
  res.status(201).json(novoTenis);
});

app.put("/produtos/:id", autenticarToken, (req, res) => {
  const id = parseInt(req.params.id);
  const produtoAtualizado = req.body;

  let index = tenis.findIndex((produto) => produto.id === id);

  if (index !== -1) {
    tenis[index] = { id, ...produtoAtualizado };
    res.json(tenis[index]);
  } else {
    res.status(404).json({
      mensagem: "Este produto não existe.",
    });
  }
});

app.delete("/produtos/:id", autenticarToken, (req, res) => {
  const id = parseInt(req.params.id);

  let index = tenis.findIndex((produto) => produto.id === id);

  if (index === -1) {
    return res.status(404).json({
      mensagem: "Este produto não existe.",
    });
  }

  tenis.splice(index, 1);

  res.json({
    mensagem: "Produto eliminado com sucesso!",
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});