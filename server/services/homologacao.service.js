var Homologacao = require('../models/homologacao.model');
_this = this;

exports.getHomologacaos = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  try {
    var homologacaos = await Homologacao.paginate(query, options);
    return homologacaos;
  } catch (e) {
    throw Error('Error while Paginating Homologacaos');
  }
}

exports.getAllHomologacaos = async function () {
  try {
    var homologacaos = await Homologacao.find();
    return homologacaos;
  } catch (e) {
    throw Error('Error while getting all Homologacaos');
  }
}

exports.getHomologacao = async function (id) {
  try {
    var homologacao = await Homologacao.findById(id);
    return homologacao;
  } catch (e) {
    throw Error('Error while getting a Versão');
  }
}

exports.createHomologacao = async function (homologacao) {
  // Creating a new Mongoose Object by using the new keyword
  var newHomologacao = new Homologacao({
    nome: homologacao.nome
  });

  try {
    var savedHomologacao = await newHomologacao.save();
    return savedHomologacao;
  } catch (e) {
    throw Error("Error while Creating Homologacao");
  }
}

exports.updateHomologacao = async function (homologacao) {
  var id = homologacao.id;

  try {
    var oldHomologacao = await Homologacao.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Homologacao");
  }

  if (!oldHomologacao) {
    return false;
  }

  oldHomologacao.nome = homologacao.nome;

  try {
    var savedHomologacao = await oldHomologacao.save();
    return savedHomologacao;
  } catch (e) {
    throw Error("And Error occured while updating the Homologacao");
  }
}

exports.deleteHomologacao = async function (id) {
  try {
    var deleted = await Homologacao.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Homologacao Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Homologacao");
  }
}