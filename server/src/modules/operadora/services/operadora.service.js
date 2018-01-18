const Operadora = require('../models/operadora.model'),
_this = this;

exports.getOperadoras = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }]
  };

  try {
    var operadoras = await Operadora.paginate(query, options);
    return operadoras;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllOperadoras = async function (query) {
  try {
    var operadoras = await Operadora
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return operadoras;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getOperadora = async function (id) {
  try {
    var operadora = await Operadora
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return operadora;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createOperadora = async function (operadora, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newOperadora = new Operadora({
    nome: operadora.nome,
    titulo: operadora.titulo,
    razaoSocial: operadora.razaoSocial,
    cnpj: operadora.cnpj,
    numeroAns: operadora.numeroAns,
    texto: operadora.texto,
    ativo: operadora.ativo,
    usuario: operadora.usuario
  });

  try {
    var savedOperadora = await newOperadora.save();
    this.createHistory(savedOperadora.id, savedOperadora, 'C', user);
    return savedOperadora;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateOperadora = async function (operadora, user) {
  var id = operadora.id;

  try {
    var oldOperadora = await Operadora.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldOperadora) {
    return false;
  }

  oldOperadora.nome = operadora.nome;
  oldOperadora.titulo = operadora.titulo;
  oldOperadora.razaoSocial = operadora.razaoSocial;
  oldOperadora.cnpj = operadora.cnpj;
  oldOperadora.numeroAns = operadora.numeroAns;
  oldOperadora.texto = operadora.texto;
  oldOperadora.ativo = operadora.ativo;

  try {
    var savedOperadora = await oldOperadora.save();
    this.createHistory(id, savedOperadora, 'U', user);
    return savedOperadora;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteOperadora = async function (id, user) {
  try {
    var operadora = await Operadora.findById(id);
    operadora.ativo = !operadora.ativo;
    var state = operadora.ativo ? 'A' : 'I';
    var savedOperadora = await operadora.save();
    this.createHistory(id, savedOperadora, state, user);
    return savedOperadora;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var operadora = await Operadora.findById(id).select('historico');
    obj.historico = undefined;
    operadora.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await operadora.save();
  } catch (e) {
    throw Error(e.message);
  }
}
