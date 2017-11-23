// Gettign the Newly created Mongoose Model we just created
var Versao = require('../models/versao.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Versoes List
exports.getVersoes = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  // Try Catch the awaited promise to handle the error
  try {
    var versoes = await Versao.paginate(query, options);
    // Return the versao list that was retured by the mongoose promise
    return versoes;
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Versoes');
  }
}

// Async function to get the Versoes List
exports.getAllVersoes = async function () {
  // Try Catch the awaited promise to handle the error
  try {
    console.log('aqui tb');
    var versoes = await Versao.find();
    // Return the versao list that was retured by the mongoose promise
    return versoes;
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while getting all Versoes');
  }
}

exports.getVersao = async function (id) {

  // Try Catch the awaited promise to handle the error
  try {
    var versao = await Versao.findById(id)
    return versao;
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while getting a Versão');
  }
}

exports.createVersao = async function (versao) {
  // Creating a new Mongoose Object by using the new keyword
  var newVersao = new Versao({
    ticket: versao.ticket,
    numeroVersao: versao.numeroVersao,
    descricao: versao.descricao,
    data: versao.data
  });

  try {
    // Saving the Versao
    var savedVersao = await newVersao.save();
    return savedVersao;
  } catch (e) {
    // return a Error message describing the reason
    throw Error("Error while Creating Versao");
  }
}

exports.updateVersao = async function (versao) {
  var id = versao.id;

  try {
    //Find the old Versao Object by the Id
    var oldVersao = await Versao.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Versao");
  }

  // If no old Versao Object exists return false
  if (!oldVersao) {
    return false;
  }

  //Edit the Versao Object
  oldVersao.ticket = versao.ticket;
  oldVersao.numeroVersao = versao.numeroVersao;
  oldVersao.descricao = versao.descricao;
  oldVersao.data = versao.data;

  try {
    var savedVersao = await oldVersao.save();
    return savedVersao;
  } catch (e) {
    throw Error("And Error occured while updating the Versao");
  }
}

exports.deleteVersao = async function (id) {
  // Delete the Versao
  try {
    var deleted = await Versao.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Versao Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Versao");
  }
}