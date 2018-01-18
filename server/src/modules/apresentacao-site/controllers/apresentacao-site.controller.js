var ApresentacaoSiteService = require('../services/apresentacao-site.service');
_this = this;

exports.getApresentacaoSite = async function (req, res, next) {
  try {
    var apresentacaoSite = await ApresentacaoSiteService.getApresentacaoSite();
    return res.status(200).json(apresentacaoSite);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createApresentacaoSite = async function (req, res, next) {
  var apresentacaoSite = {
    titulo: req.body.titulo,
    subtitulo: req.body.subtitulo,
    texto: req.body.texto,
    urlVerMais: req.body.urlVerMais
  };

  try {
    var createdApresentacaoSite = await ApresentacaoSiteService.createApresentacaoSite(apresentacaoSite);
    return res.status(201).json(createdApresentacaoSite);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "ApresentacaoSite Creation was Unsuccesfull" });
  }
}

exports.updateApresentacaoSite = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var apresentacaoSite = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    subtitulo: req.body.subtitulo ? req.body.subtitulo : null,
    texto: req.body.texto ? req.body.texto : null,
    urlVerMais: req.body.texto ? req.body.urlVerMais : null
  };

  try {
    var updatedApresentacaoSite = await ApresentacaoSiteService.updateApresentacaoSite(apresentacaoSite);
    return res.status(200).json({ status: 200, data: updatedApresentacaoSite, message: "Succesfully Updated ApresentacaoSite" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}