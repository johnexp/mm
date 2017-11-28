var Arquivo = require('../models/arquivo.model');
const fs = require('fs');
const uploadPath = './public/upload/';
_this = this;

exports.saveFile = function (file, nomeArquivo) {
  try {
    var filePath = uploadPath + nomeArquivo;
    let writeStream = fs.createWriteStream(filePath);
    writeStream.write(file.value, 'base64');
    writeStream.on('finish', () => {
      console.log('wrote all data to file');
    });
    writeStream.end();
    return filePath;
  } catch (e) {
    throw Error('Não foi possível salvar o arquivo no servidor.');
  }
}

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
    descricao: arquivo.descricao
  });

  try {
    var nomeArquivoReal = Date.now() + '-' + file.filename;
    newArquivo.caminhoArquivo = this.saveFile(file, nomeArquivoReal);
    newArquivo.nomeArquivo = file.filename;
    newArquivo.nomeArquivoReal = nomeArquivoReal;

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

  try {
    if (file) {
      var nomeArquivoReal = Date.now() + '-' + file.filename;
      var nomeArquivoAntigo = oldArquivo.nomeArquivoReal;
      oldArquivo.caminhoArquivo = this.saveFile(file, nomeArquivoReal);
      oldArquivo.nomeArquivoReal = nomeArquivoReal;
      oldArquivo.nomeArquivo = file.filename;

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
    var deleted = await Arquivo.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Arquivo Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error(e.message);
  }
}