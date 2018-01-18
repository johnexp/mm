var ParamService = require('../services/param.service');
_this = this;

exports.getParams = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.key ? query.key = { $regex: new RegExp('^.*' + req.body.key.trim() + '.*', 'i') } : null;
  req.body.value ? query.value = { $regex: new RegExp('^.*' + req.body.value.trim() + '.*', 'i') } : null;
  req.body.description ? query.description = { $regex: new RegExp('^.*' + req.body.description.trim() + '.*', 'i') } : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var params = await ParamService.getParams(query, page, limit, sort);
    return res.status(200).json(params);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllParams = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var params = await ParamService.getAllParams(query);
    return res.status(200).json(params);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getParam = async function (req, res, next) {
  try {
    var params = await ParamService.getParam(req.params.id)
    return res.status(200).json(params);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createParam = async function (req, res, next) {

  var param = {
    key: req.body.key,
    value: req.body.value,
    description: req.body.description,
    ativo: req.body.ativo,
    usuario: req.user.sub
  };

  try {
    var createdParam = await ParamService.createParam(param, req.user.sub);
    return res.status(201).json(createdParam);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateParam = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var param = {
    id,
    value: req.body.value ? req.body.value : null,
    description: req.body.description ? req.body.description : null
  };

  if (req.user.roles.indexOf('admin') > -1) {
    param.key = req.body.key ? req.body.key : null;
    param.ativo = req.body.ativo ? req.body.ativo : null;
  }

  try {
    var updatedParam = await ParamService.updateParam(param, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedParam, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeParam = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await ParamService.deleteParam(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
