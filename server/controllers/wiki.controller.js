var WikiService = require('../services/wiki.service');
_this = this;

exports.getWikis = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.titulo ? query.titulo = { $regex: new RegExp('^.*' + req.body.titulo.trim() + '.*', 'i') } : null;
  req.body.conteudo ? query.conteudo = { $regex: new RegExp('^.*' + req.body.conteudo.trim() + '.*', 'i') } : null;
  req.body.descricao ? query.descricao = { $regex: new RegExp('^.*' + req.body.descricao.trim() + '.*', 'i') } : null;
  req.body.dataPublicacao ? query.dataPublicacao = req.body.dataPublicacao : null;

  try {
    var wikis = await WikiService.getWikis(query, page, limit, sort);
    return res.status(200).json(wikis);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getAllWikis = async function (req, res, next) {
  try {
    var wikis = await WikiService.getAllWikis();
    return res.status(200).json(wikis);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getWiki = async function (req, res, next) {
  try {
    var wikis = await WikiService.getWiki(req.params.id)
    return res.status(200).json(wikis);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createWiki = async function (req, res, next) {
  var wiki = {
    titulo: req.body.titulo,
    dataPublicacao: req.body.dataPublicacao,
    descricao: req.body.descricao,
    conteudo: req.body.conteudo
  };

  try {
    var createdWiki = await WikiService.createWiki(wiki);
    return res.status(201).json(createdWiki);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar ao cadastrar.', reason: e.message });
  }
}

exports.updateWiki = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id must be present' });
  }

  var id = req.body._id;
  var wiki = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    dataPublicacao: req.body.dataPublicacao ? req.body.dataPublicacao : null,
    descricao: req.body.descricao ? req.body.descricao : null,
    conteudo: req.body.conteudo ? req.body.conteudo : null
  };

  try {
    var updatedWiki = await WikiService.updateWiki(wiki);
    return res.status(200).json({ status: 200, data: updatedWiki, message: 'Succesfully Updated Wiki' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}

exports.removeWiki = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await WikiService.deleteWiki(id);
    return res.status(204).json({ status: 204, message: 'Succesfully Wiki Deleted' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.uploadImage = async function (req, res, next) {
  return res.status(200).json({ 'link': 'http://' + req.headers.host + '/upload/wiki-files/' + req.file.filename });
}

exports.deleteImage = async function (req, res, next) {
  console.log(req.body);
  return res.status(200).json({ 'link': 'http://' + req.headers.host + '/upload/wiki-files/' + req.file.filename });
}
