var File = require('../models/file.model');
const fs = require('fs');
const uploadPath = './public/upload/files/';
_this = this;

exports.deleteFile = async function (fileName) {
  try {
    fs.unlink(uploadPath + fileName);
  } catch (e) {
    throw Error('Não foi possível remover o arquivo' + fileName + ' do servidor.');
  }
}

exports.getFiles = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit
  };

  try {
    var files = await File.paginate(query, options);
    return files;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllFiles = async function () {
  try {
    var files = await File.find();
    return files;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getFile = async function (id) {
  try {
    var file = await File.findById(id);
    return file;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createOrUpdateFile = async function (fileModel, file) {
  if (fileModel._id) {
    return await this.updateFile(fileModel, file);
  } else {
    return await this.createFile(fileModel, file);
  }
}

exports.createFile = async function (fileModel, file) {
  if (!file) {
    return;
  }
  // Creating a new Mongoose Object by using the new keyword
  var newFile = new File({
    description: fileModel.description,
    fileName: fileModel.fileName,
    realFileName: file.filename,
    filePath: uploadPath + file.filename
  });

  try {
    var savedFile = await newFile.save();
    return savedFile;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateFile = async function (fileModel, file) {
  if (!file) {
    return fileModel;
  }
  try {
    var oldFileModel = await File.findById(fileModel._id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldFileModel) {
    return false;
  }

  oldFileModel.description = fileModel.description;
  oldFileModel.fileName = fileModel.fileName;

  try {
    if (file) {
      var oldFileName = oldFileModel.realFileName;
      oldFileModel.realFileName = file.filename;
      oldFileModel.filePath = uploadPath + file.filename;

      if (oldFileName) {
        this.deleteFile(oldFileName);
      }
    } else {
      if (oldFileModel.filePath != null && !fileModel.filePath) {
        this.deleteFile(oldFileModel.realFileName);
        oldFileModel.filePath = null;
        oldFileModel.fileName = null;
        oldFileModel.realFileName = null;
      }
    }

    var savedFile = await oldFileModel.save();
    return savedFile;
  } catch (e) {
    throw Error(e.message);
  }
}
