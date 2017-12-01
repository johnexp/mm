var SobreService = require('../services/sobre.service');
_this = this;

exports.getSobre = async function (req, res, next) {
  try {
    var sobre = await SobreService.getSobre();
    return res.status(200).json(sobre);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createSobre = async function (req, res, next) {
  var sobre = {
    titulo: req.body.titulo,
    subtitulo: req.body.subtitulo,
    texto: req.body.texto
  };

  try {
    var createdSobre = await SobreService.createSobre(sobre);
    return res.status(201).json(createdSobre);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Sobre Creation was Unsuccesfull" });
  }
}

exports.updateSobre = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var sobre = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    subtitulo: req.body.subtitulo ? req.body.subtitulo : null,
    texto: req.body.texto ? req.body.texto : null
  };

  try {
    var updatedSobre = await SobreService.updateSobre(sobre);
    return res.status(200).json({ status: 200, data: updatedSobre, message: "Succesfully Updated Sobre" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}