var PermissionService = require('../services/permission.service');
_this = this;

exports.getPermissiones = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.action ? query.action = req.body.action : null;
  req.body.module ? query.module = req.body.module : null;
  req.body.stringfied ? query.stringfied = { $regex: new RegExp('^.*' + req.body.stringfied.trim() + '.*', 'i') } : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var permissiones = await PermissionService.getPermissiones(query, page, limit, sort);
    return res.status(200).json(permissiones);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllPermissiones = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var permissiones = await PermissionService.getAllPermissiones(query);
    return res.status(200).json(permissiones);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getPermission = async function (req, res, next) {
  try {
    var permissiones = await PermissionService.getPermission(req.params.id)
    return res.status(200).json(permissiones);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createPermission = async function (req, res, next) {

  var permission = {
    action: req.body.action,
    module: req.body.module,
    stringfied: req.body.module.moduleName.toLowerCase() + ':' + req.body.action.actionName.toLowerCase(),
    ativo: req.body.ativo,
    usuario: req.user.sub
  };

  try {
    var createdPermission = await PermissionService.createPermission(permission, req.user.sub);
    return res.status(201).json(createdPermission);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updatePermission = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var permission = {
    id,
    action: req.body.action ? req.body.action : null,
    module: req.body.module ? req.body.module : null,
    stringfied: req.body.module.moduleName.toLowerCase() + ':' + req.body.action.actionName.toLowerCase(),
    ativo: req.body.ativo
  };

  try {
    var updatedPermission = await PermissionService.updatePermission(permission, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedPermission, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removePermission = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await PermissionService.deletePermission(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
