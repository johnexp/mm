var Membro = require('../models/membro.model');
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

exports.getMembros = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  try {
    var membros = await Membro.paginate(query, options);
    return membros;
  } catch (e) {
    throw Error('Error while Paginating Membros');
  }
}

exports.getAllMembros = async function (query) {
  try {
    var membros = await Membro.find(query);
    return membros;
  } catch (e) {
    throw Error('Error while getting all Membros');
  }
}

exports.getMembro = async function (id) {
  try {
    var membro = await Membro.findById(id);
    return membro;
  } catch (e) {
    throw Error('Error while getting a Versão');
  }
}

exports.createMembro = async function (membro) {
  // Creating a new Mongoose Object by using the new keyword
  var newMembro = new Membro({
    nome: membro.nome,
    cargo: membro.cargo,
    apresentacao: membro.apresentacao,
    ativo: membro.ativo
  });

  try {
    var nomeArquivo = Date.now() + '-' + membro.foto.filename;
    newMembro.arquivo = this.saveFile(membro.foto, nomeArquivo);
    newMembro.nomeArquivo = nomeArquivo;

    var savedMembro = await newMembro.save();
    return savedMembro;
  } catch (e) {
    throw Error("Error while Creating Membro");
  }
}

exports.updateMembro = async function (membro) {
  var id = membro.id;

  try {
    var oldMembro = await Membro.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Membro");
  }

  if (!oldMembro) {
    return false;
  }

  oldMembro.nome = membro.nome;
  oldMembro.cargo = membro.cargo;
  oldMembro.apresentacao = membro.apresentacao;
  oldMembro.ativo = membro.ativo;

  try {
    if (membro.foto) {
      var nomeArquivo = Date.now() + '-' + membro.foto.filename;
      var nomeArquivoAntigo = oldMembro.nomeArquivo;
      oldMembro.arquivo = this.saveFile(membro.foto, nomeArquivo);
      oldMembro.nomeArquivo = nomeArquivo;

      if (nomeArquivoAntigo) {
        this.deleteFile(nomeArquivoAntigo);
      }
    } else {
      if (oldMembro.arquivo != null && !membro.arquivo) {
        this.deleteFile(oldMembro.nomeArquivo);
        oldMembro.arquivo = null;
        oldMembro.nomeArquivo = null;
      }
    }

    var savedMembro = await oldMembro.save();
    return savedMembro;
  } catch (e) {
    throw Error("And Error occured while updating the Membro");
  }
}

exports.deleteMembro = async function (id) {
  try {
    var membro = await Membro.findById(id);
    membro.ativo = !membro.ativo;
    var savedMembro = await membro.save();
    return savedMembro;
    // var deleted = await Membro.remove({ _id: id });
    // if (deleted.result.n === 0) {
    //   throw Error("Membro Could not be deleted");
    // }
    // return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Membro");
  }
}