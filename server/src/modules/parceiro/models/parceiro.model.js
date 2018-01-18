var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ParceiroSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Nome" é obrigatório!']
  },
  tipo: {
    type: String,
    enum: ['Entidade', 'Operadora'],
    required: [true, 'O campo "Tipo da Entidade" é obrigatório!']
  },
  imagem: {
    type: mongoose.Schema.ObjectId,
    ref: 'File',
    required: [true, 'O campo "Imagem" é obrigatório!']
  },
  url: {
    type: String,
    trim: true,
    minlength: [5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [100, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "URL" é obrigatório!']
  },
  ordem: {
    type: Number,
    min: [1, 'O valor é menor que o mínimo permitido: ({MIN})']
  },
  criacao: {
    type: Date,
    default: Date.now
  },
  historico: {
    type: [{
      _id: false,
      data: {
        type: Date
      },
      usuario: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      acao: {
        type: String
      },
      objeto: {
        type: String
      }
    }],
    select: false
  },
  ativo: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

ParceiroSchema.pre('save', function(next) {

  next();
});

ParceiroSchema.plugin(mongoosePaginate);
const Parceiro = mongoose.model('Parceiro', ParceiroSchema);

module.exports = Parceiro;