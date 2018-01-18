const OperadoraService = require('../services/operadora.service'),
_this = this;

exports.getOperadoras = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.titulo ? query.titulo = { $regex: new RegExp('^.*' + req.body.titulo.trim() + '.*', 'i') } : null;
  req.body.razaoSocial ? query.razaoSocial = { $regex: new RegExp('^.*' + req.body.razaoSocial.trim() + '.*', 'i') } : null;
  req.body.cnpj ? query.cnpj = { $regex: new RegExp('^.*' + req.body.cnpj.trim() + '.*', 'i') } : null;
  req.body.numeroAns ? query.numeroAns = { $regex: new RegExp('^.*' + req.body.numeroAns.trim() + '.*', 'i') } : null;
  req.body.texto ? query.texto = { $regex: new RegExp('^.*' + req.body.texto.trim() + '.*', 'i') } : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var operadoras = await OperadoraService.getOperadoras(query, page, limit, sort);
    return res.status(200).json(operadoras);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllOperadoras = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var operadoras = await OperadoraService.getAllOperadoras(query);
    return res.status(200).json(operadoras);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getOperadora = async function (req, res, next) {
  try {
    var operadoras = await OperadoraService.getOperadora(req.params.id);
    return res.status(200).json(operadoras);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createOperadora = async function (req, res, next) {

  var operadora = {
    titulo: req.body.titulo,
    razaoSocial: req.body.razaoSocial,
    cnpj: req.body.cnpj,
    numeroAns: req.body.numeroAns,
    texto: req.body.texto,
    ativo: req.body.ativo,
    usuario: req.user.sub
  };

  try {
    var createdOperadora = await OperadoraService.createOperadora(operadora, req.user.sub);
    return res.status(201).json(createdOperadora);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateOperadora = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var operadora = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    razaoSocial: req.body.razaoSocial ? req.body.razaoSocial : null,
    cnpj: req.body.cnpj ? req.body.cnpj : null,
    numeroAns: req.body.numeroAns ? req.body.numeroAns : null,
    texto: req.body.texto ? req.body.texto : null,
    ativo: req.body.ativo
  };

  try {
    var updatedOperadora = await OperadoraService.updateOperadora(operadora, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedOperadora, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeOperadora = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await OperadoraService.deleteOperadora(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
