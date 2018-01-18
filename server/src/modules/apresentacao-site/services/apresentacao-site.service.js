var ApresentacaoSite = require('../models/apresentacao-site.model');
_this = this;

exports.getApresentacaoSite = async function () {
  try {
    var apresentacaoSite = await ApresentacaoSite.findOne();
    return apresentacaoSite;
  } catch (e) {
    throw Error('Error while Paginating ApresentacaoSite');
  }
}

exports.createApresentacaoSite = async function (apresentacaoSite) {
  // Creating a new Mongoose Object by using the new keyword
  var newApresentacaoSite = new ApresentacaoSite({
    titulo: apresentacaoSite.titulo,
    subtitulo: apresentacaoSite.subtitulo,
    texto: apresentacaoSite.texto,
    urlVerMais: apresentacaoSite.urlVerMais
  });

  try {
    var savedApresentacaoSite = await newApresentacaoSite.save();
    return savedApresentacaoSite;
  } catch (e) {
    throw Error("Error while Creating ApresentacaoSite");
  }
}

exports.updateApresentacaoSite = async function (apresentacaoSite) {
  var id = apresentacaoSite.id;

  try {
    var oldApresentacaoSite = await ApresentacaoSite.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the ApresentacaoSite");
  }

  if (!oldApresentacaoSite) {
    return false;
  }

  oldApresentacaoSite.titulo = apresentacaoSite.titulo;
  oldApresentacaoSite.subtitulo = apresentacaoSite.subtitulo;
  oldApresentacaoSite.texto = apresentacaoSite.texto;
  oldApresentacaoSite.urlVerMais = apresentacaoSite.urlVerMais;

  try {
    var savedApresentacaoSite = await oldApresentacaoSite.save();
    return savedApresentacaoSite;
  } catch (e) {
    throw Error("And Error occured while updating the ApresentacaoSite");
  }
}