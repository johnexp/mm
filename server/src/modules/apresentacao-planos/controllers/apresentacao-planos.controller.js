var ApresentacaoPlanosService = require('../services/apresentacao-planos.service');
_this = this;

exports.getApresentacaoPlanos = async function (req, res, next) {
  try {
    var apresentacaoPlanos = await ApresentacaoPlanosService.getApresentacaoPlanos();
    return res.status(200).json(apresentacaoPlanos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createApresentacaoPlanos = async function (req, res, next) {
  var apresentacaoPlanos = {
    titulo: req.body.titulo,
    subtitulo: req.body.subtitulo,
    texto: req.body.texto,
    urlVerMais: req.body.urlVerMais
  };

  try {
    var createdApresentacaoPlanos = await ApresentacaoPlanosService.createApresentacaoPlanos(apresentacaoPlanos);
    return res.status(201).json(createdApresentacaoPlanos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "ApresentacaoPlanos Creation was Unsuccesfull" });
  }
}

exports.updateApresentacaoPlanos = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: "Id must be present" });
  }

  var id = req.body._id;
  var apresentacaoPlanos = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    subtitulo: req.body.subtitulo ? req.body.subtitulo : null,
    texto: req.body.texto ? req.body.texto : null,
    urlVerMais: req.body.texto ? req.body.urlVerMais : null
  };

  try {
    var updatedApresentacaoPlanos = await ApresentacaoPlanosService.updateApresentacaoPlanos(apresentacaoPlanos);
    return res.status(200).json({ status: 200, data: updatedApresentacaoPlanos, message: "Succesfully Updated ApresentacaoPlanos" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}