var Membro = require('../models/membro.model');
var fs = require('fs');
var mongoose = require('mongoose');
var Gridfs = require('gridfs-stream');
_this = this;

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

exports.getAllMembros = async function () {
  try {
    var membros = await Membro.find().select('-foto');
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
    foto: membro.foto
  });

  try {
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
  oldMembro.foto = membro.foto;

  try {
    var savedMembro = await oldMembro.save();
    return savedMembro;
  } catch (e) {
    throw Error("And Error occured while updating the Membro");
  }
}

exports.salvarFoto = async function (membro) {
  var db = mongoose.connection.db;
  var mongoDriver = mongoose.mongo;
  var gfs = new Gridfs(db, mongoDriver);

  var writestream = gfs.createWriteStream({
    filename: membro.foto.nome,
    mode: 'w',
    metadata: membro.foto.hash
  });
  fs.createReadStream('C:\\').pipe(writestream);

  writestream.on('close', function (file) {
    Membro.findById(membro.id, function (err, _membro) {
      // handle error
      _membro.foto = membro.foto;
      _membro.save(function (err, updatedMembro) {
        // handle error
        return res.json(200, updatedMembro)
      })
    });
    fs.unlink('C:\\', function (err) {
      // handle error
      console.log('success!')
    });
  });
}

exports.deleteMembro = async function (id) {
  try {
    var deleted = await Membro.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Membro Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Membro");
  }
}