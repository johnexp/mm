var MenuModule = require('../models/menu-module.model');
var User = require('../../user/models/user.model');
_this = this;

exports.getMenuModule = async function (query, page, limit, sort) {
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
    var menuModule = await MenuModule.paginate(query, options);
    return menuModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllMenuModule = async function () {
  try {
    var menuModule = await MenuModule
      .find()
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return menuModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getMenuModule = async function (id) {
  try {
    var menuModule = await MenuModule
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return menuModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getByName = async function (name, user) {
  try {
    var userData = await User.findById(user.sub).populate('permissions');
    const paths = [];
    userData.permissions.forEach(function(permission) {
      paths.push(permission.stringfied.split(':')[0])
    });
    var menuModule = await MenuModule.aggregate([
      { $unwind: '$menus' },
      { $match: { name: name, 'menus.path': { $in: paths } } },
      { $project: { _id: 1, menus: 1, name: 1 } }
    ]);
    return menuModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getModules = async function (user) {
  try {
    var userData = await User.findById(user.sub);
    var menuModule = await MenuModule
      .find({ roles: { $in: userData.roles } }).select('name label');
    return menuModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createMenuModule = async function (menuModule, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newMenuModule = new MenuModule({
    nome: menuModule.nome,
    name: menuModule.name,
    label: menuModule.label,
    roles: menuModule.roles,
    menus: menuModule.menus,
    usuario: menuModule.usuario
  });

  try {
    var savedMenuModule = await newMenuModule.save();
    this.createHistory(savedMenuModule.id, savedMenuModule, 'C', user);
    return savedMenuModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateMenuModule = async function (menuModule, user) {
  var id = menuModule.id;

  try {
    var oldMenuModule = await MenuModule.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldMenuModule) {
    return false;
  }

  oldMenuModule.nome = menuModule.nome;
  oldMenuModule.name = menuModule.name;
  oldMenuModule.label = menuModule.label;
  oldMenuModule.roles = menuModule.roles;
  oldMenuModule.menus = menuModule.menus;

  try {
    var savedMenuModule = await oldMenuModule.save();
    this.createHistory(id, savedMenuModule, 'U', user);
    return savedMenuModule;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteMenuModule = async function (id) {
  try {
    var deleted = await MenuModule.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("MenuModule Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var menuModule = await MenuModule.findById(id).select('historico');
    obj.historico = undefined;
    menuModule.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await menuModule.save();
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getEnumValue = async function (field) {
  try {
    const path = MenuModule.schema.path(field);
    if (path.instance === 'Array') {
      return path.caster.enumValues;
    }
    return path.enumValues;
  } catch (e) {
    throw Error(e.message);
  }
}