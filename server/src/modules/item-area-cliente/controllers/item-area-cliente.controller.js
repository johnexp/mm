const ItemAreaClienteService = require('../services/item-area-cliente.service'),
_this = this;

exports.getItemAreaCliente = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.titulo ? query.titulo = { $regex: new RegExp('^.*' + req.body.titulo.trim() + '.*', 'i') } : null;
  req.body.resumo ? query.resumo = { $regex: new RegExp('^.*' + req.body.resumo.trim() + '.*', 'i') } : null;
  req.body.cor ? query.cor = { $regex: new RegExp('^.*' + req.body.cor.trim() + '.*', 'i') } : null;
  req.body.url ? query.url = { $regex: new RegExp('^.*' + req.body.url.trim() + '.*', 'i') } : null;
  req.body.icone ? query.icone = { $regex: new RegExp('^.*' + req.body.icone.trim() + '.*', 'i') } : null;

  if (req.body.home != null && req.body.home !== undefined) {
    query.home = req.body.home;
  }

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var itemAreaCliente = await ItemAreaClienteService.getItemAreaCliente(query, page, limit, sort);
    return res.status(200).json(itemAreaCliente);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllItemAreaCliente = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var itemAreaCliente = await ItemAreaClienteService.getAllItemAreaCliente(query);
    return res.status(200).json(itemAreaCliente);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getActives = async function (req, res, next) {
  try {
    var itemAreaCliente = await ItemAreaClienteService.getActives();
    return res.status(200).json(itemAreaCliente);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getItensHome = async function (req, res, next) {
  try {
    var itemAreaCliente = await ItemAreaClienteService.getItensHome();
    return res.status(200).json(itemAreaCliente);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getItemAreaCliente = async function (req, res, next) {
  try {
    var itemAreaCliente = await ItemAreaClienteService.getItemAreaCliente(req.params.id);
    return res.status(200).json(itemAreaCliente);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createItemAreaCliente = async function (req, res, next) {

  var itemAreaCliente = {
    titulo: req.body.titulo,
    resumo: req.body.resumo,
    cor: req.body.cor,
    url: req.body.url,
    icone: req.body.icone,
    home: req.body.home,
    ordem: req.body.ordem,
    ativo: req.body.ativo,
    usuario: req.user.sub
  };

  try {
    var createdItemAreaCliente = await ItemAreaClienteService.createItemAreaCliente(itemAreaCliente, req.user.sub);
    return res.status(201).json(createdItemAreaCliente);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateItemAreaCliente = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var itemAreaCliente = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    resumo: req.body.resumo ? req.body.resumo : null,
    cor: req.body.cor ? req.body.cor : null,
    url: req.body.url ? req.body.url : null,
    icone: req.body.icone ? req.body.icone : null,
    ordem: req.body.ordem ? req.body.ordem : null,
    home: req.body.home,
    ativo: req.body.ativo
  };

  try {
    var updatedItemAreaCliente = await ItemAreaClienteService.updateItemAreaCliente(itemAreaCliente, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedItemAreaCliente, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeItemAreaCliente = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await ItemAreaClienteService.deleteItemAreaCliente(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}

exports.getEnumValue = async function (req, res, next) {
  try {
    var enumValues = await ItemAreaClienteService.getEnumValue(req.params.field);
    return res.status(200).json(enumValues);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar obter os valores do campo "' + field + '": ' + e });
  }
}
