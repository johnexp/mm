const ProdutoServico = require('../models/produto-servico.model'),
_this = this;

exports.getProdutoServico = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }, {
      path: 'imagem'
    }]
  };

  try {
    var produtoServico = await ProdutoServico.paginate(query, options);
    return produtoServico;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllProdutoServico = async function (query) {
  try {
    var produtoServico = await ProdutoServico
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'imagem'
      }]);
    return produtoServico;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getProdutoServico = async function (id) {
  try {
    var produtoServico = await ProdutoServico
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'imagem'
      }]);
    return produtoServico;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createProdutoServico = async function (produtoServico, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newProdutoServico = new ProdutoServico({
    nome: produtoServico.nome,
    titulo: produtoServico.titulo,
    data: produtoServico.data,
    descricao: produtoServico.descricao,
    imagem: produtoServico.imagem,
    ativo: produtoServico.ativo,
    usuario: produtoServico.usuario
  });

  try {
    var savedProdutoServico = await newProdutoServico.save();
    this.createHistory(savedProdutoServico.id, savedProdutoServico, 'C', user);
    return savedProdutoServico;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateProdutoServico = async function (produtoServico, user) {
  var id = produtoServico.id;

  try {
    var oldProdutoServico = await ProdutoServico.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldProdutoServico) {
    return false;
  }

  oldProdutoServico.nome = produtoServico.nome;
  oldProdutoServico.titulo = produtoServico.titulo;
  oldProdutoServico.data = produtoServico.data;
  oldProdutoServico.descricao = produtoServico.descricao;
  oldProdutoServico.imagem = produtoServico.imagem;
  oldProdutoServico.ativo = produtoServico.ativo;

  try {
    var savedProdutoServico = await oldProdutoServico.save();
    this.createHistory(id, savedProdutoServico, 'U', user);
    return savedProdutoServico;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteProdutoServico = async function (id, user) {
  try {
    var produtoServico = await ProdutoServico.findById(id);
    produtoServico.ativo = !produtoServico.ativo;
    var state = produtoServico.ativo ? 'A' : 'I';
    var savedProdutoServico = await produtoServico.save();
    this.createHistory(id, savedProdutoServico, state, user);
    return savedProdutoServico;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var produtoServico = await ProdutoServico.findById(id).select('historico');
    obj.historico = undefined;
    produtoServico.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await produtoServico.save();
  } catch (e) {
    throw Error(e.message);
  }
}
