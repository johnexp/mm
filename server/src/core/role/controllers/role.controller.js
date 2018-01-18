var RoleService = require('../services/role.service');
_this = this;

exports.getRoles = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.roleName ? query.roleName = { $regex: new RegExp('^.*' + req.body.roleName.trim() + '.*', 'i') } : null;
  req.body.roleKey ? query.roleKey = { $regex: new RegExp('^.*' + req.body.roleKey.trim() + '.*', 'i') } : null;
  req.body.permissions ? query.permissions = { $in: req.body.permissions } : null;

  if (req.body.isAdmin != null && req.body.isAdmin !== undefined) {
    query.isAdmin = req.body.isAdmin;
  }

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var roles = await RoleService.getRoles(query, page, limit, sort);
    return res.status(200).json(roles);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllRoles = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var roles = await RoleService.getAllRoles(query);
    return res.status(200).json(roles);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getRole = async function (req, res, next) {
  try {
    var roles = await RoleService.getRole(req.params.id)
    return res.status(200).json(roles);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createRole = async function (req, res, next) {

  var role = {
    roleName: req.body.roleName,
    roleKey: req.body.roleKey,
    permissions: req.body.permissions,
    isAdmin: req.body.isAdmin,
    ativo: req.body.ativo,
    usuario: req.user.sub
  };

  try {
    var createdRole = await RoleService.createRole(role, req.user.sub);
    return res.status(201).json(createdRole);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateRole = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var role = {
    id,
    roleName: req.body.roleName ? req.body.roleName : null,
    roleKey: req.body.roleKey ? req.body.roleKey : null,
    permissions: req.body.permissions ? req.body.permissions : null,
    isAdmin: req.body.isAdmin,
    ativo: req.body.ativo
  };

  try {
    var updatedRole = await RoleService.updateRole(role, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedRole, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeRole = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await RoleService.deleteRole(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
