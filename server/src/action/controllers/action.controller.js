var ActionService = require('../services/action.service');
_this = this;

exports.getActiones = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.actionName ? query.actionName = { $regex: new RegExp('^.*' + req.body.actionName.trim() + '.*', 'i') } : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var actiones = await ActionService.getActiones(query, page, limit, sort);
    return res.status(200).json(actiones);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllActiones = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var actiones = await ActionService.getAllActiones(query);
    return res.status(200).json(actiones);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getAction = async function (req, res, next) {
  try {
    var actiones = await ActionService.getAction(req.params.id)
    return res.status(200).json(actiones);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createAction = async function (req, res, next) {

  var action = {
    actionName: req.body.actionName,
    dependants: req.body.dependants,
    ativo: req.body.ativo,
    usuario: req.user.sub
  };

  try {
    var createdAction = await ActionService.createAction(action, req.user.sub);
    return res.status(201).json(createdAction);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateAction = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var action = {
    id,
    actionName: req.body.actionName ? req.body.actionName : null,
    dependants: req.body.dependants ? req.body.dependants : null,
    ativo: req.body.ativo
  };

  try {
    var updatedAction = await ActionService.updateAction(action, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedAction, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeAction = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await ActionService.deleteAction(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
