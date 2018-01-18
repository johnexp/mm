const AssuntoContatoService = require('../services/assunto-contato.service'),
_this = this;

exports.getAssuntoContato = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.assunto ? query.assunto = { $regex: new RegExp('^.*' + req.body.assunto.trim() + '.*', 'i') } : null;
  req.body.email ? query.email = { $regex: new RegExp('^.*' + req.body.email.trim() + '.*', 'i') } : null;
  req.body.informacoesAdicionais ? query.informacoesAdicionais = { $regex: new RegExp('^.*' + req.body.informacoesAdicionais.trim() + '.*', 'i') } : null;


  try {
    var assuntoContato = await AssuntoContatoService.getAssuntoContato(query, page, limit, sort);
    return res.status(200).json(assuntoContato);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllAssuntoContato = async function (req, res, next) {
  try {
    var assuntoContato = await AssuntoContatoService.getAllAssuntoContato();
    return res.status(200).json(assuntoContato);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getAssuntoContato = async function (req, res, next) {
  try {
    var assuntoContato = await AssuntoContatoService.getAssuntoContato(req.params.id);
    return res.status(200).json(assuntoContato);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createAssuntoContato = async function (req, res, next) {

  var assuntoContato = {
    assunto: req.body.assunto,
    email: req.body.email,
    informacoesAdicionais: req.body.informacoesAdicionais,
    usuario: req.user.sub
  };

  try {
    var createdAssuntoContato = await AssuntoContatoService.createAssuntoContato(assuntoContato, req.user.sub);
    return res.status(201).json(createdAssuntoContato);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateAssuntoContato = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var assuntoContato = {
    id,
    assunto: req.body.assunto ? req.body.assunto : null,
    email: req.body.email ? req.body.email : null,
    informacoesAdicionais: req.body.informacoesAdicionais ? req.body.informacoesAdicionais : null,
  };

  try {
    var updatedAssuntoContato = await AssuntoContatoService.updateAssuntoContato(assuntoContato, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedAssuntoContato, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeAssuntoContato = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await AssuntoContatoService.deleteAssuntoContato(id);
    return res.status(204).json({ status: 204, message: 'Registro removido com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}

