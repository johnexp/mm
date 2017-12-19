var Action = require('../models/action.model');
_this = this;

exports.getActiones = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }, {
      path: 'dependants'
    }]
  };

  try {
    var actiones = await Action.paginate(query, options);
    return actiones;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllActiones = async function (query) {
  try {
    var actiones = await Action
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'dependants'
      }]);
    return actiones;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAction = async function (id) {
  try {
    var action = await Action
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'dependants'
      }]);
    return action;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createAction = async function (action, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newAction = new Action({
    nome: action.nome,
    actionName: action.actionName,
    dependants: action.dependants,
    ativo: action.ativo,
    usuario: action.usuario
  });

  try {
    var savedAction = await newAction.save();
    this.createHistory(savedAction.id, savedAction, 'C', user);
    return savedAction;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateAction = async function (action, user) {
  var id = action.id;

  try {
    var oldAction = await Action.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldAction) {
    return false;
  }

  oldAction.nome = action.nome;
  oldAction.actionName = action.actionName;
  oldAction.dependants = action.dependants;
  oldAction.ativo = action.ativo;

  try {
    var savedAction = await oldAction.save();
    this.createHistory(id, savedAction, 'U', user);
    return savedAction;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteAction = async function (id, user) {
  try {
    var action = await Action.findById(id);
    action.ativo = !action.ativo;
    var state = action.ativo ? 'A' : 'I';
    var savedAction = await action.save();
    this.createHistory(id, savedAction, state, user);
    return savedAction;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var action = await Action.findById(id).select('historico');
    obj.historico = undefined;
    action.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await action.save();
  } catch (e) {
    throw Error(e.message);
  }
}
