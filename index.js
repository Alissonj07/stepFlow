index
const express = require('express');

const app = express();

app.use(express.json());

const tenis = [
  {
    id: 1,
    nome: 'Nike Air Max 270',
    preco: 599.90,
    tamanho: [39, 40, 41, 42, 43],
    cor: 'Preto',
    quantidadeEstoque: 50,
    imagem: 'nike_air_max_270.jpg',
    descricao: 'Tênis confortável corrida e uso diário.'
  },
  {
    id: 2,
    nome: 'Adidas Ultra Boost',
    preco: 799.90,
    tamanho: [40, 41, 42, 43],
    cor: 'Branco',
    quantidadeEstoque: 40,
    imagem: 'adidas_ultra_boost.jpg',
    descricao: 'Tênis de alta performance com conforto extremo.'
  },
  {
    id: 3,
    nome: 'Puma RS-X³',
    preco: 499.90,
    tamanho: [38, 39, 40, 41],
    cor: 'Azul',
    quantidadeEstoque: 30,
    imagem: 'puma_rs_x3.jpg',
    descricao: 'Design futurista e confortável.'
  },
  {
    id: 4,
    nome: 'Reebok Classic Leather',
    preco: 399.90,
    tamanho: [37, 38, 39, 40],
    cor: 'Cinza',
    quantidadeEstoque: 25,
    imagem: 'reebok_classic_leather.jpg',
    descricao: 'Tênis casual com estilo clássico.'
  },
  {
    id: 5,
    nome: 'New Balance 990v5',
    preco: 899.90,
    tamanho: [42, 43, 44],
    cor: 'Cinza Claro',
    quantidadeEstoque: 15,
    imagem: 'new_balance_990v5.jpg',
    descricao: 'Tênis de alto desempenho, ideal para corridas longas.'
  }
];

app.get('/produtos', (req, res) => {
  res.json(tenis);
});

app.post("/produtos", (req, res) => {
  const novoTenis = req.body;
  novoTenis.id = tenis.length + 1;
  tenis.push(novoTenis);
  res.status(201).json(novoTenis);
});

app.put("/produtos/:id/estoque", (req, res) => {
  const id = parseInt(req.params.id);
  const quantidade = req.body.quantidade;

  const tenisEncontrado = tenis.find((t) => t.id === id);

  if (!tenisEncontrado) {
    return res.status(404).json({ mensagem: "Não encontrado" });
  }
  tenisEncontrado.quantidadeEstoque += quantidade;
  res.status(200).json(tenisEncontrado);
});

app.get('/produtos/busca', (req, res) => {
  const { nome } = req.query;
  const resultadoBusca = tenis.filter((t) => t.nome.toLowerCase().includes(nome.toLowerCase()));
  res.json(resultadoBusca);
});

app.listen(3000, () => {
  console.log("Servidor roda na porta 3000!");
});
