const DepoimentoService = require('../services/depoimento.service'),
_this = this;

exports.getDepoimentos = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.empresa ? query.empresa = { $regex: new RegExp('^.*' + req.body.empresa.trim() + '.*', 'i') } : null;
  req.body.depoimento ? query.depoimento = { $regex: new RegExp('^.*' + req.body.depoimento.trim() + '.*', 'i') } : null;


  try {
    var depoimentos = await DepoimentoService.getDepoimentos(query, page, limit, sort);
    return res.status(200).json(depoimentos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllDepoimentos = async function (req, res, next) {
  try {
    var depoimentos = await DepoimentoService.getAllDepoimentos();
    return res.status(200).json(depoimentos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getDepoimento = async function (req, res, next) {
  try {
    var depoimentos = await DepoimentoService.getDepoimento(req.params.id);
    return res.status(200).json(depoimentos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createDepoimento = async function (req, res, next) {

  var depoimento = {
    empresa: req.body.empresa,
    depoimento: req.body.depoimento,
    usuario: req.user.sub
  };

  try {
    var createdDepoimento = await DepoimentoService.createDepoimento(depoimento, req.user.sub);
    return res.status(201).json(createdDepoimento);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateDepoimento = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var depoimento = {
    id,
    empresa: req.body.empresa ? req.body.empresa : null,
    depoimento: req.body.depoimento ? req.body.depoimento : null,
  };

  try {
    var updatedDepoimento = await DepoimentoService.updateDepoimento(depoimento, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedDepoimento, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeDepoimento = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await DepoimentoService.deleteDepoimento(id);
    return res.status(204).json({ status: 204, message: 'Registro removido com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
