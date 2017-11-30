var MembroService = require('../services/membro.service');
_this = this;

exports.getMembros = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.nome ? query.nome = { $regex: new RegExp('^.*' + req.body.nome.trim() + '.*', 'i') } : null;
  req.body.cargo ? query.cargo = { $regex: new RegExp('^.*' + req.body.cargo.trim() + '.*', 'i') } : null;
  req.body.apresentacao ? query.apresentacao = { $regex: new RegExp('^.*' + req.body.apresentacao.trim() + '.*', 'i') } : null;

  try {
    var membros = await MembroService.getMembros(query, page, limit, sort);
    return res.status(200).json(membros);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getAllMembros = async function (req, res, next) {
  try {
    var membros = await MembroService.getAllMembros();
    return res.status(200).json(membros);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getMembro = async function (req, res, next) {
  try {
    var membros = await MembroService.getMembro(req.params.id)
    return res.status(200).json(membros);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createMembro = async function (req, res, next) {
  var membro = {
    nome: req.body.nome,
    cargo: req.body.cargo,
    apresentacao: req.body.apresentacao,
    foto: req.body.foto
  };

  try {
    var createdMembro = await MembroService.createMembro(membro);
    return res.status(201).json(createdMembro);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Membro Creation was Unsuccesfull" });
  }
}

exports.updateMembro = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var sasc = {
    id,
    nome: req.body.nome ? req.body.nome : null,
    cargo: req.body.cargo ? req.body.cargo : null,
    apresentacao: req.body.apresentacao ? req.body.apresentacao : null,
    arquivo: req.body.arquivo ? req.body.arquivo : null,
    nomeArquivo: req.body.nomeArquivo ? req.body.nomeArquivo : null,
    foto: req.body.foto ? req.body.foto : null
  };

  try {
    var updatedMembro = await MembroService.updateMembro(sasc);
    return res.status(200).json({ status: 200, data: updatedMembro, message: "Succesfully Updated Membro" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}

exports.removeMembro = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await MembroService.deleteMembro(id);
    return res.status(204).json({ status: 204, message: "Succesfully Membro Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}