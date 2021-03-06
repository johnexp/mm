var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var MembroSchema = new mongoose.Schema({
  nome: {
    type: String,
    default: '',
    required: 'Preencha o campo "Nome"',
    trim: true,
  },
  cargo: {
    type: String,
    default: '',
    required: 'Preencha o campo "Cargo"',
    trim: true
  },
  apresentacao: {
    type: String,
    default: '',
    required: 'Preencha o campo "Apresentação"',
    trim: true
  },
  arquivo: {
    type: String,
    trim: true
  },
  nomeArquivo: {
    type: String
  },
  foto: {
    _id: false,
    filename: {
      type: String
    },
    filetype: {
      type: String
    },
    value: {
      type: String
    }
  },
  ativo: {
    type: Boolean,
    default: true,
    required: true
  }
});

MembroSchema.plugin(mongoosePaginate);
const Membro = mongoose.model('Membro', MembroSchema);

module.exports = Membro;