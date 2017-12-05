var Sobre = require('../models/sobre.model');
_this = this;

exports.getSobre = async function () {
  try {
    var sobre = await Sobre.findOne();
    return sobre;
  } catch (e) {
    throw Error('Error while Paginating Sobre');
  }
}

exports.createSobre = async function (sobre) {
  // Creating a new Mongoose Object by using the new keyword
  var newSobre = new Sobre({
    titulo: sobre.titulo,
    subtitulo: sobre.subtitulo,
    texto: sobre.texto
  });

  try {
    var savedSobre = await newSobre.save();
    return savedSobre;
  } catch (e) {
    throw Error("Error while Creating Sobre");
  }
}

exports.updateSobre = async function (sobre) {
  var id = sobre.id;

  try {
    var oldSobre = await Sobre.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Sobre");
  }

  if (!oldSobre) {
    return false;
  }

  oldSobre.titulo = sobre.titulo;
  oldSobre.subtitulo = sobre.subtitulo;
  oldSobre.texto = sobre.texto;

  try {
    var savedSobre = await oldSobre.save();
    return savedSobre;
  } catch (e) {
    throw Error("And Error occured while updating the Sobre");
  }
}