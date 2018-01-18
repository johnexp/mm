var ApresentacaoPlanos = require('../models/apresentacao-planos.model');
_this = this;

exports.getApresentacaoPlanos = async function () {
  try {
    var apresentacaoPlanos = await ApresentacaoPlanos.findOne();
    return apresentacaoPlanos;
  } catch (e) {
    throw Error('Error while Paginating ApresentacaoPlanos');
  }
}

exports.createApresentacaoPlanos = async function (apresentacaoPlanos) {
  // Creating a new Mongoose Object by using the new keyword
  var newApresentacaoPlanos = new ApresentacaoPlanos({
    titulo: apresentacaoPlanos.titulo,
    subtitulo: apresentacaoPlanos.subtitulo,
    texto: apresentacaoPlanos.texto,
    urlVerMais: apresentacaoPlanos.urlVerMais
  });

  try {
    var savedApresentacaoPlanos = await newApresentacaoPlanos.save();
    return savedApresentacaoPlanos;
  } catch (e) {
    throw Error("Error while Creating ApresentacaoPlanos");
  }
}

exports.updateApresentacaoPlanos = async function (apresentacaoPlanos) {
  var id = apresentacaoPlanos.id;

  try {
    var oldApresentacaoPlanos = await ApresentacaoPlanos.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the ApresentacaoPlanos");
  }

  if (!oldApresentacaoPlanos) {
    return false;
  }

  oldApresentacaoPlanos.titulo = apresentacaoPlanos.titulo;
  oldApresentacaoPlanos.subtitulo = apresentacaoPlanos.subtitulo;
  oldApresentacaoPlanos.texto = apresentacaoPlanos.texto;
  oldApresentacaoPlanos.urlVerMais = apresentacaoPlanos.urlVerMais;

  try {
    var savedApresentacaoPlanos = await oldApresentacaoPlanos.save();
    return savedApresentacaoPlanos;
  } catch (e) {
    throw Error("And Error occured while updating the ApresentacaoPlanos");
  }
}