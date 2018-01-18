let Param = require('../models/param.model'),
  s = require('underscore.string'),
  _this = this;

exports.getParams = async function (query, page, limit, sort) {
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
    var params = await Param.paginate(query, options);
    return params;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllParams = async function (query) {
  try {
    var params = await Param
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return params;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getParam = async function (id) {
  try {
    var param = await Param
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return param;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createParam = async function (param, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newParam = new Param({
    key: param.key,
    value: param.value,
    description: param.description,
    ativo: param.ativo,
    usuario: param.usuario
  });

  try {
    var savedParam = await newParam.save();
    this.createHistory(savedParam.id, savedParam, 'C', user);
    return savedParam;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateParam = async function (param, user) {
  var id = param.id;

  try {
    var oldParam = await Param.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldParam) {
    return false;
  }

  oldParam.value = param.value;
  oldParam.description = param.description;

  if (param.key !== undefined) {
    oldParam.key = param.key;
  }

  if (param.ativo !== undefined) {
    oldParam.ativo = param.ativo;
  }

  try {
    var savedParam = await oldParam.save();
    this.createHistory(id, savedParam, 'U', user);

    return savedParam;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteParam = async function (id, user) {
  try {
    var param = await Param.findById(id);
    param.ativo = !param.ativo;
    var state = param.ativo ? 'A' : 'I';
    var savedParam = await param.save();
    this.createHistory(id, savedParam, state, user);
    return savedParam;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var param = await Param.findById(id).select('historico');
    obj.historico = undefined;
    param.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await param.save();
  } catch (e) {
    throw Error(e.message);
  }
}
