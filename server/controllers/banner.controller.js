var BannerService = require('../services/banner.service');
_this = this;

exports.getBanneres = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.titulo ? query.titulo = { $regex: new RegExp('^.*' + req.body.titulo.trim() + '.*', 'i') } : null;
  req.body.texto ? query.texto = { $regex: new RegExp('^.*' + req.body.texto.trim() + '.*', 'i') } : null;

  try {
    var banneres = await BannerService.getBanneres(query, page, limit, sort);
    return res.status(200).json(banneres);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getAllBanneres = async function (req, res, next) {
  try {
    var banneres = await BannerService.getAllBanneres();
    return res.status(200).json(banneres);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getBanner = async function (req, res, next) {
  try {
    var banneres = await BannerService.getBanner(req.params.id)
    return res.status(200).json(banneres);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createBanner = async function (req, res, next) {
  var botoes = null;
  if (req.body.botoes) {
    for (var i = 0; i < req.body.botoes.length; i++) {
      if (req.body.botoes[i]._id.startsWith('___')) {
        delete req.body.botoes[i]._id;
      }
    }
    botoes = req.body.botoes;
  }
  var banner = {
    titulo: req.body.titulo,
    texto: req.body.texto,
    botoes: botoes
  };
  var imagem = req.body.imagem;

  try {
    var createdBanner = await BannerService.createBanner(banner, imagem);
    return res.status(201).json(createdBanner);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Banner Creation was Unsuccesfull" });
  }
}

exports.updateBanner = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var botoes = null;
  if (req.body.botoes) {
    for (var i = 0; i < req.body.botoes.length; i++) {
      if (req.body.botoes[i]._id.startsWith('___')) {
        delete req.body.botoes[i]._id;
      }
    }
    botoes = req.body.botoes;
  }
  var banner = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    texto: req.body.texto ? req.body.texto : null,
    arquivo: req.body.arquivo ? req.body.arquivo : null,
    nomeArquivo: req.body.nomeArquivo ? req.body.nomeArquivo : null,
    botoes: botoes
  };

  var imagem = req.body.imagem;

  try {
    var updatedBanner = await BannerService.updateBanner(banner, imagem);
    return res.status(200).json({ status: 200, data: updatedBanner, message: "Succesfully Updated Banner" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}

exports.removeBanner = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await BannerService.deleteBanner(id);
    return res.status(204).json({ status: 204, message: "Succesfully Banner Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}