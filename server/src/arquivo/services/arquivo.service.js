var Arquivo = require('../models/arquivo.model');
const fs = require('fs');
const uploadPath = './public/upload/arquivos/';
_this = this;

exports.deleteFile = async function (nomeArquivo) {
  try {
    fs.unlink(uploadPath + nomeArquivo);
  } catch (e) {
    throw Error('Não foi possível remover o arquivo' + nomeArquivo + ' do servidor.');
  }
}

exports.getArquivos = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  try {
    var arquivos = await Arquivo.paginate(query, options);
    return arquivos;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllArquivos = async function () {
  try {
    var arquivos = await Arquivo.find();
    return arquivos;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getArquivo = async function (id) {
  try {
    var arquivo = await Arquivo.findById(id);
    return arquivo;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createArquivo = async function (arquivo, file) {
  // Creating a new Mongoose Object by using the new keyword
  var newArquivo = new Arquivo({
    nome: arquivo.nome,
    descricao: arquivo.descricao,
    nomeArquivo: arquivo.nomeArquivo,
    nomeArquivoReal: file.filename,
    caminhoArquivo: uploadPath + file.filename
  });

  try {
    var savedArquivo = await newArquivo.save();
    return savedArquivo;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateArquivo = async function (arquivo, file) {
  var id = arquivo.id;

  try {
    var oldArquivo = await Arquivo.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldArquivo) {
    return false;
  }

  oldArquivo.nome = arquivo.nome;
  oldArquivo.descricao = arquivo.descricao;
  oldArquivo.nomeArquivo = arquivo.nomeArquivo;

  try {
    if (file) {
      var nomeArquivoAntigo = oldArquivo.nomeArquivoReal;
      oldArquivo.nomeArquivoReal = file.filename;
      oldArquivo.caminhoArquivo = uploadPath + file.filename;

      if (nomeArquivoAntigo) {
        this.deleteFile(nomeArquivoAntigo);
      }
    } else {
      if (oldArquivo.caminhoArquivo != null && !arquivo.caminhoArquivo) {
        this.deleteFile(oldArquivo.nomeArquivoReal);
        oldArquivo.caminhoArquivo = null;
        oldArquivo.nomeArquivo = null;
        oldArquivo.nomeArquivoReal = null;
      }
    }

    var savedArquivo = await oldArquivo.save();
    return savedArquivo;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteArquivo = async function (id) {
  try {
    const arquivo = await Arquivo.findById(id);
    this.deleteFile(arquivo.nomeArquivoReal);
    var deleted = await Arquivo.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Arquivo Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error(e.message);
  }
}