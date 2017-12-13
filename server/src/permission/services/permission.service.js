var Permission = require('../models/permission.model');
_this = this;

exports.getPermissiones = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }, {
      path: 'action',
      select: 'actionName'
    }, {
      path: 'module',
      select: 'moduleName'
    }]
  };

  try {
    var permissiones = await Permission.paginate(query, options);
    return permissiones;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllPermissiones = async function (query) {
  try {
    var permissiones = await Permission
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'action',
        select: 'actionName'
      }, {
        path: 'module',
        select: 'moduleName'
      }]);
    return permissiones;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getPermission = async function (id) {
  try {
    var permission = await Permission
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'action',
        select: 'actionName'
      }, {
        path: 'module',
        select: 'moduleName'
      }]);
    return permission;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createPermission = async function (permission, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newPermission = new Permission({
    nome: permission.nome,
    action: permission.action,
    module: permission.module,
    stringfied: permission.stringfied,
    prettified: permission.prettified,
    ativo: permission.ativo,
    usuario: permission.usuario
  });

  try {
    var savedPermission = await newPermission.save();
    this.createHistory(savedPermission.id, savedPermission, 'C', user);
    return savedPermission;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updatePermission = async function (permission, user) {
  var id = permission.id;

  try {
    var oldPermission = await Permission.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldPermission) {
    return false;
  }

  oldPermission.nome = permission.nome;
  oldPermission.action = permission.action;
  oldPermission.module = permission.module;
  oldPermission.stringfied = permission.stringfied;
  oldPermission.prettified = permission.prettified;
  oldPermission.ativo = permission.ativo;

  try {
    var savedPermission = await oldPermission.save();
    this.createHistory(id, savedPermission, 'U', user);
    return savedPermission;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deletePermission = async function (id, user) {
  try {
    var permission = await Permission.findById(id);
    permission.ativo = !permission.ativo;
    var state = permission.ativo ? 'A' : 'I';
    var savedPermission = await permission.save();
    this.createHistory(id, savedPermission, state, user);
    return savedPermission;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var permission = await Permission.findById(id).select('historico');
    obj.historico = undefined;
    permission.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await permission.save();
  } catch (e) {
    throw Error(e.message);
  }
}
