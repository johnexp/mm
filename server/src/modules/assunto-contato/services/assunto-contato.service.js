const AssuntoContato = require('../models/assunto-contato.model'),
_this = this;

exports.getAssuntoContato = async function (query, page, limit, sort) {
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
    var assuntoContato = await AssuntoContato.paginate(query, options);
    return assuntoContato;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllAssuntoContato = async function () {
  try {
    var assuntoContato = await AssuntoContato
      .find()
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return assuntoContato;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAssuntoContato = async function (id) {
  try {
    var assuntoContato = await AssuntoContato
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return assuntoContato;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createAssuntoContato = async function (assuntoContato, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newAssuntoContato = new AssuntoContato({
    nome: assuntoContato.nome,
    assunto: assuntoContato.assunto,
    email: assuntoContato.email,
    informacoesAdicionais: assuntoContato.informacoesAdicionais,
    usuario: assuntoContato.usuario
  });

  try {
    var savedAssuntoContato = await newAssuntoContato.save();
    this.createHistory(savedAssuntoContato.id, savedAssuntoContato, 'C', user);
    return savedAssuntoContato;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateAssuntoContato = async function (assuntoContato, user) {
  var id = assuntoContato.id;

  try {
    var oldAssuntoContato = await AssuntoContato.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldAssuntoContato) {
    return false;
  }

  oldAssuntoContato.nome = assuntoContato.nome;
  oldAssuntoContato.assunto = assuntoContato.assunto;
  oldAssuntoContato.email = assuntoContato.email;
  oldAssuntoContato.informacoesAdicionais = assuntoContato.informacoesAdicionais;

  try {
    var savedAssuntoContato = await oldAssuntoContato.save();
    this.createHistory(id, savedAssuntoContato, 'U', user);
    return savedAssuntoContato;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteAssuntoContato = async function (id) {
  try {
    var deleted = await AssuntoContato.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("AssuntoContato Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var assuntoContato = await AssuntoContato.findById(id).select('historico');
    obj.historico = undefined;
    assuntoContato.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await assuntoContato.save();
  } catch (e) {
    throw Error(e.message);
  }
}
