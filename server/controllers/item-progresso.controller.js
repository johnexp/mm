var ItemProgressoService = require('../services/item-progresso.service');
_this = this;

exports.getItemProgresso = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.titulo ? query.titulo = { $regex: new RegExp('^.*' + req.body.titulo.trim() + '.*', 'i') } : null;
  req.body.subtitulo ? query.subtitulo = { $regex: new RegExp('^.*' + req.body.subtitulo.trim() + '.*', 'i') } : null;

  try {
    var itemProgresso = await ItemProgressoService.getItemProgresso(query, page, limit, sort);
    return res.status(200).json(itemProgresso);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getAllItemProgresso = async function (req, res, next) {
  try {
    var itemProgresso = await ItemProgressoService.getAllItemProgresso();
    return res.status(200).json(itemProgresso);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getItemProgresso = async function (req, res, next) {
  try {
    var itemProgresso = await ItemProgressoService.getItemProgresso(req.params.id)
    return res.status(200).json(itemProgresso);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createItemProgresso = async function (req, res, next) {
  var itemProgresso = {
    titulo: req.body.titulo,
    subtitulo: req.body.subtitulo,
    progresso: req.body.progresso
  };

  try {
    var createdItemProgresso = await ItemProgressoService.createItemProgresso(itemProgresso);
    return res.status(201).json(createdItemProgresso);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "ItemProgresso Creation was Unsuccesfull" });
  }
}

exports.updateItemProgresso = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var itemProgresso = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    subtitulo: req.body.subtitulo ? req.body.subtitulo : null,
    progresso: req.body.progresso ? req.body.progresso : null
  };

  try {
    var updatedItemProgresso = await ItemProgressoService.updateItemProgresso(itemProgresso);
    return res.status(200).json({ status: 200, data: updatedItemProgresso, message: "Succesfully Updated ItemProgresso" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}

exports.removeItemProgresso = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await ItemProgressoService.deleteItemProgresso(id);
    return res.status(204).json({ status: 204, message: "Succesfully ItemProgresso Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}