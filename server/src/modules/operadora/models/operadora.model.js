var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var OperadoraSchema = new mongoose.Schema({
  titulo: {
    type: String,
    trim: true,
    minlength: [5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [100, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Título" é obrigatório!']
  },
  razaoSocial: {
    type: String,
    trim: true,
    maxlength: [100, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']
  },
  cnpj: {
    type: String,
    trim: true,
    minlength: [18, 'O CNPJ deve possuir 18 caracteres com a máscara.'],
    maxlength: [18, 'O CNPJ deve possuir 18 caracteres com a máscara.'],
    required: [true, 'O campo "CNPJ" é obrigatório!']
  },
  numeroAns: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [10, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']
  },
  texto: {
    type: String,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    required: [true, 'O campo "Texto" é obrigatório!']
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

OperadoraSchema.pre('save', function(next) {

  next();
});

OperadoraSchema.plugin(mongoosePaginate);
const Operadora = mongoose.model('Operadora', OperadoraSchema);

module.exports = Operadora;