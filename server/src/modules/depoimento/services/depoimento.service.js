const Depoimento = require('../models/depoimento.model'),
_this = this;

exports.getDepoimentos = async function (query, page, limit, sort) {
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
    var depoimentos = await Depoimento.paginate(query, options);
    return depoimentos;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllDepoimentos = async function () {
  try {
    var depoimentos = await Depoimento
      .find()
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return depoimentos;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getDepoimento = async function (id) {
  try {
    var depoimento = await Depoimento
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return depoimento;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createDepoimento = async function (depoimento, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newDepoimento = new Depoimento({
    nome: depoimento.nome,
    empresa: depoimento.empresa,
    depoimento: depoimento.depoimento,
    usuario: depoimento.usuario
  });

  try {
    var savedDepoimento = await newDepoimento.save();
    this.createHistory(savedDepoimento.id, savedDepoimento, 'C', user);
    return savedDepoimento;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateDepoimento = async function (depoimento, user) {
  var id = depoimento.id;

  try {
    var oldDepoimento = await Depoimento.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldDepoimento) {
    return false;
  }

  oldDepoimento.nome = depoimento.nome;
  oldDepoimento.empresa = depoimento.empresa;
  oldDepoimento.depoimento = depoimento.depoimento;

  try {
    var savedDepoimento = await oldDepoimento.save();
    this.createHistory(id, savedDepoimento, 'U', user);
    return savedDepoimento;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteDepoimento = async function (id) {
  try {
    var deleted = await Depoimento.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Depoimento Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var depoimento = await Depoimento.findById(id).select('historico');
    obj.historico = undefined;
    depoimento.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await depoimento.save();
  } catch (e) {
    throw Error(e.message);
  }
}
