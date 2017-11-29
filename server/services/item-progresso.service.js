var ItemProgresso = require('../models/item-progresso.model');
_this = this;

exports.getItemProgresso = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  try {
    var itemProgresso = await ItemProgresso.paginate(query, options);
    return itemProgresso;
  } catch (e) {
    throw Error('Error while Paginating ItemProgresso');
  }
}

exports.getAllItemProgresso = async function () {
  try {
    var itemProgresso = await ItemProgresso.find();
    return itemProgresso;
  } catch (e) {
    throw Error('Error while getting all ItemProgresso');
  }
}

exports.getItemProgresso = async function (id) {
  try {
    var itemProgresso = await ItemProgresso.findById(id);
    return itemProgresso;
  } catch (e) {
    throw Error('Error while getting a Versão');
  }
}

exports.createItemProgresso = async function (itemProgresso) {
  // Creating a new Mongoose Object by using the new keyword
  var newItemProgresso = new ItemProgresso({
    titulo: itemProgresso.titulo,
    subtitulo: itemProgresso.subtitulo,
    progresso: itemProgresso.progresso,
    cor: itemProgresso.cor
  });

  try {
    var savedItemProgresso = await newItemProgresso.save();
    return savedItemProgresso;
  } catch (e) {
    throw Error("Error while Creating ItemProgresso");
  }
}

exports.updateItemProgresso = async function (itemProgresso) {
  var id = itemProgresso.id;

  try {
    var oldItemProgresso = await ItemProgresso.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the ItemProgresso");
  }

  if (!oldItemProgresso) {
    return false;
  }

  oldItemProgresso.titulo = itemProgresso.titulo;
  oldItemProgresso.subtitulo = itemProgresso.subtitulo;
  oldItemProgresso.progresso = itemProgresso.progresso;
  oldItemProgresso.cor = itemProgresso.cor;

  try {
    var savedItemProgresso = await oldItemProgresso.save();
    return savedItemProgresso;
  } catch (e) {
    throw Error("And Error occured while updating the ItemProgresso");
  }
}

exports.deleteItemProgresso = async function (id) {
  try {
    var deleted = await ItemProgresso.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("ItemProgresso Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the ItemProgresso");
  }
}