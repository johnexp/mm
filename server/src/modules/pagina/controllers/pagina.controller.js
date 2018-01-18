const PaginaService = require('../services/pagina.service'),
_this = this;

exports.getByPagina = async function (req, res, next) {
  try {
    var paginas = await PaginaService.getByPagina(req.params.pagina);
    return res.status(200).json(paginas);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createPagina = async function (req, res, next) {

  var pagina = {
    titulo: req.body.titulo,
    resumo: req.body.resumo,
    conteudo: req.body.conteudo,
    pagina: req.body.pagina,
    usuario: req.user.sub
  };

  try {
    var createdPagina = await PaginaService.createPagina(pagina, req.user.sub);
    return res.status(201).json(createdPagina);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updatePagina = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: 'Id do registro não encontrado: ' + e });
  }

  var id = req.body._id;
  var pagina = {
    id,
    titulo: req.body.titulo ? req.body.titulo : null,
    resumo: req.body.resumo ? req.body.resumo : null,
    conteudo: req.body.conteudo ? req.body.conteudo : null,
    pagina: req.body.pagina ? req.body.pagina : null,
  };

  try {
    var updatedPagina = await PaginaService.updatePagina(pagina, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedPagina, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.uploadImage = async function (req, res, next) {
  return res.status(200).json({ 'link': '/public/upload/files/pagina/' + req.file.filename });
}

exports.deleteImage = async function (req, res, next) {
  return res.status(200).json({ 'link': '/public/upload/files/pagina/' + req.file.filename });
}
