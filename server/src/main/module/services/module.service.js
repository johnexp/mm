let Module = require('../models/module.model'),
  Permission = require('../../permission/models/permission.model'),
  s = require('underscore.string'),
  _this = this;

exports.getModules = async function (query, page, limit, sort) {
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
    var modules = await Module.paginate(query, options);
    return modules;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllModules = async function (query) {
  try {
    var modules = await Module
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return modules;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getModule = async function (id) {
  try {
    var module = await Module
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return module;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createModule = async function (module, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newModule = new Module({
    nome: module.nome,
    moduleName: module.moduleName,
    ativo: module.ativo,
    usuario: module.usuario
  });

  try {
    var savedModule = await newModule.save();
    this.createHistory(savedModule.id, savedModule, 'C', user);
    return savedModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateModule = async function (module, user) {
  var id = module.id;

  try {
    var oldModule = await Module.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldModule) {
    return false;
  }

  oldModule.nome = module.nome;
  oldModule.moduleName = module.moduleName;
  oldModule.ativo = module.ativo;

  try {
    var savedModule = await oldModule.save();
    this.updatePermissions(savedModule);
    this.createHistory(id, savedModule, 'U', user);

    return savedModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updatePermissions = async function (module) {
  try {
    var permissions = await Permission.find({ module: module.id }).populate('action');
    permissions.forEach(function (permission) {
      let slugifiedModuleName = s(module.moduleName).slugify().value();
      permission.stringfied = slugifiedModuleName + ':' + permission.action.actionName.toLowerCase();
      permission.prettified = permission.action.actionName + ' ' + module.moduleName;
      permission.save();
    });
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteModule = async function (id, user) {
  try {
    var module = await Module.findById(id);
    module.ativo = !module.ativo;
    var state = module.ativo ? 'A' : 'I';
    var savedModule = await module.save();
    this.createHistory(id, savedModule, state, user);
    return savedModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var module = await Module.findById(id).select('historico');
    obj.historico = undefined;
    module.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await module.save();
  } catch (e) {
    throw Error(e.message);
  }
}
