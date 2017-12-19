var ModuleService = require('../services/module.service');
_this = this;

exports.getModules = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.moduleName ? query.moduleName = { $regex: new RegExp('^.*' + req.body.moduleName.trim() + '.*', 'i') } : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var modules = await ModuleService.getModules(query, page, limit, sort);
    return res.status(200).json(modules);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllModules = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var modules = await ModuleService.getAllModules(query);
    return res.status(200).json(modules);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getModule = async function (req, res, next) {
  try {
    var modules = await ModuleService.getModule(req.params.id)
    return res.status(200).json(modules);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createModule = async function (req, res, next) {

  var module = {
    moduleName: req.body.moduleName,
    ativo: req.body.ativo,
    usuario: req.user.sub
  };

  try {
    var createdModule = await ModuleService.createModule(module, req.user.sub);
    return res.status(201).json(createdModule);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateModule = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var module = {
    id,
    moduleName: req.body.moduleName ? req.body.moduleName : null,
    ativo: req.body.ativo
  };

  try {
    var updatedModule = await ModuleService.updateModule(module, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedModule, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeModule = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await ModuleService.deleteModule(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
