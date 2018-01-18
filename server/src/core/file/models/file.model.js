var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var FileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    default: '',
    required: 'Preencha o campo "Nome"',
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  filePath: {
    type: String,
    trim: true,
    required: 'Preencha o campo "Arquivo"'
  },
  realFileName: {
    type: String
  }
});

FileSchema.plugin(mongoosePaginate);
const File = mongoose.model('File', FileSchema);

module.exports = File;