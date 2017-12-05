var Banner = require('../models/banner.model');
const fs = require('fs');
const uploadPath = './public/upload/';
_this = this;

exports.saveFile = function (imagem, nomeArquivo) {
  try {
    var filePath = uploadPath + nomeArquivo;
    let writeStream = fs.createWriteStream(filePath);
    writeStream.write(imagem.value, 'base64');
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

exports.getBanneres = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  try {
    var banneres = await Banner.paginate(query, options);
    return banneres;
  } catch (e) {
    throw Error('Error while Paginating Banneres');
  }
}

exports.getAllBanneres = async function () {
  try {
    var banneres = await Banner.find();
    return banneres;
  } catch (e) {
    throw Error('Error while getting all Banneres');
  }
}

exports.getBanner = async function (id) {
  try {
    var banner = await Banner.findById(id);
    return banner;
  } catch (e) {
    throw Error('Error while getting a Versão');
  }
}

exports.createBanner = async function (banner, imagem) {
  // Creating a new Mongoose Object by using the new keyword
  var newBanner = new Banner({
    titulo: banner.titulo,
    texto: banner.texto,
    botoes: banner.botoes
  });

  try {
    var nomeArquivo = Date.now() + '-' + imagem.filename;
    newBanner.arquivo = this.saveFile(imagem, nomeArquivo);
    newBanner.nomeArquivo = nomeArquivo;

    var savedBanner = await newBanner.save();
    return savedBanner;
  } catch (e) {
    throw Error("Error while Creating Banner");
  }
}

exports.updateBanner = async function (banner, imagem) {
  var id = banner.id;

  try {
    var oldBanner = await Banner.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Banner");
  }

  if (!oldBanner) {
    return false;
  }

  oldBanner.titulo = banner.titulo;
  oldBanner.texto = banner.texto;
  oldBanner.botoes = banner.botoes;

  try {
    if (imagem) {
      var nomeArquivo = Date.now() + '-' + imagem.filename;
      var nomeArquivoAntigo = oldBanner.nomeArquivo;
      oldBanner.arquivo = this.saveFile(imagem, nomeArquivo);
      oldBanner.nomeArquivo = nomeArquivo;

      if (nomeArquivoAntigo) {
        this.deleteFile(nomeArquivoAntigo);
      }
    } else {
      if (oldBanner.arquivo != null && !banner.arquivo) {
        this.deleteFile(oldBanner.nomeArquivo);
        oldBanner.arquivo = null;
        oldBanner.nomeArquivo = null;
      }
    }

    var savedBanner = await oldBanner.save();
    return savedBanner;
  } catch (e) {
    throw Error("And Error occured while updating the Banner");
  }
}

exports.deleteBanner = async function (id) {
  try {
    var deleted = await Banner.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Banner Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Banner");
  }
}
