var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PaginaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "titulo" é obrigatório!']
  },
  resumo: {
    type: String,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  conteudo: {
    type: String,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    required: [true, 'O campo "Conteúdo" é obrigatório!']
  },
  pagina: {
    type: String,
    trim: true,
    required: [true, 'O campo "Página" é obrigatório!']
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
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

PaginaSchema.pre('save', function(next) {

  next();
});

PaginaSchema.plugin(mongoosePaginate);
const Pagina = mongoose.model('Pagina', PaginaSchema);

module.exports = Pagina;