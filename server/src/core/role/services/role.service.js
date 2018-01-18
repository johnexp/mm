var Role = require('../models/role.model');
_this = this;

exports.getRoles = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }, {
      path: 'permissions'
    }]
  };

  try {
    var roles = await Role.paginate(query, options);
    return roles;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllRoles = async function (query) {
  try {
    var roles = await Role
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'permissions'
      }]);
    return roles;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getRole = async function (id) {
  try {
    var role = await Role
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'permissions'
      }]);
    return role;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createRole = async function (role, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newRole = new Role({
    nome: role.nome,
    roleName: role.roleName,
    roleKey: role.roleKey,
    permissions: role.permissions,
    isAdmin: role.isAdmin,
    ativo: role.ativo,
    usuario: role.usuario
  });

  try {
    var savedRole = await newRole.save();
    this.createHistory(savedRole.id, savedRole, 'C', user);
    return savedRole;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateRole = async function (role, user) {
  var id = role.id;

  try {
    var oldRole = await Role.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldRole) {
    return false;
  }

  oldRole.nome = role.nome;
  oldRole.roleName = role.roleName;
  oldRole.roleKey = role.roleKey;
  oldRole.permissions = role.permissions;
  oldRole.isAdmin = role.isAdmin;
  oldRole.ativo = role.ativo;

  try {
    var savedRole = await oldRole.save();
    this.createHistory(id, savedRole, 'U', user);
    return savedRole;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteRole = async function (id, user) {
  try {
    var role = await Role.findById(id);
    role.ativo = !role.ativo;
    var state = role.ativo ? 'A' : 'I';
    var savedRole = await role.save();
    this.createHistory(id, savedRole, state, user);
    return savedRole;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var role = await Role.findById(id).select('historico');
    obj.historico = undefined;
    role.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await role.save();
  } catch (e) {
    throw Error(e.message);
  }
}
