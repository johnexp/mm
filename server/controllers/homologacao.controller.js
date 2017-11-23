var HomologacaoService = require('../services/homologacao.service');
_this = this;

exports.getHomologacaos = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.nome ? query.nome = { $regex: new RegExp('^.*' + req.body.nome.trim() + '.*', 'i') } : null;

  try {
    var homologacaos = await HomologacaoService.getHomologacaos(query, page, limit, sort);
    return res.status(200).json(homologacaos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getAllHomologacaos = async function (req, res, next) {
  try {
    var homologacaos = await HomologacaoService.getAllHomologacaos();
    return res.status(200).json(homologacaos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getHomologacao = async function (req, res, next) {
  try {
    var homologacaos = await HomologacaoService.getHomologacao(req.params.id)
    return res.status(200).json(homologacaos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createHomologacao = async function (req, res, next) {
  var homologacao = {
    nome: req.body.nome
  };

  try {
    var createdHomologacao = await HomologacaoService.createHomologacao(homologacao);
    return res.status(201).json(createdHomologacao);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Homologacao Creation was Unsuccesfull" });
  }
}

exports.updateHomologacao = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var homologacao = {
    id,
    nome: req.body.nome ? req.body.nome : null
  };

  try {
    var updatedHomologacao = await HomologacaoService.updateHomologacao(homologacao);
    return res.status(200).json({ status: 200, data: updatedHomologacao, message: "Succesfully Updated Homologacao" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}

exports.removeHomologacao = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await HomologacaoService.deleteHomologacao(id);
    return res.status(204).json({ status: 204, message: "Succesfully Homologacao Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}