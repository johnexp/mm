var Wiki = require('../models/wiki.model');
_this = this;

exports.getWikis = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  try {
    var wikis = await Wiki.paginate(query, options);
    return wikis;
  } catch (e) {
    throw Error('Error while Paginating Wikis');
  }
}

exports.getAllWikis = async function () {
  try {
    var wikis = await Wiki.find();
    return wikis;
  } catch (e) {
    throw Error('Error while getting all Wikis');
  }
}

exports.getWiki = async function (id) {
  try {
    var wiki = await Wiki.findById(id);
    return wiki;
  } catch (e) {
    throw Error('Error while getting a Versão');
  }
}

exports.createWiki = async function (wiki) {
  // Creating a new Mongoose Object by using the new keyword
  var newWiki = new Wiki({
    titulo: wiki.titulo,
    dataPublicacao: wiki.dataPublicacao,
    descricao: wiki.descricao,
    conteudo: wiki.conteudo
  });

  try {
    var savedWiki = await newWiki.save();
    return savedWiki;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateWiki = async function (wiki) {
  var id = wiki.id;

  try {
    var oldWiki = await Wiki.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Wiki");
  }

  if (!oldWiki) {
    return false;
  }

  oldWiki.titulo = wiki.titulo;
  oldWiki.dataPublicacao = wiki.dataPublicacao;
  oldWiki.conteudo = wiki.conteudo;
  oldWiki.descricao = wiki.descricao;

  try {
    var savedWiki = await oldWiki.save();
    return savedWiki;
  } catch (e) {
    throw Error("And Error occured while updating the Wiki");
  }
}

exports.deleteWiki = async function (id) {
  try {
    var deleted = await Wiki.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Wiki Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Wiki");
  }
}
