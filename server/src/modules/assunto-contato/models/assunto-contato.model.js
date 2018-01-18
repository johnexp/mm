var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var AssuntoContatoSchema = new mongoose.Schema({
  assunto: {
    type: String,
    trim: true,
    minlength: [2, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [150, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Assunto" é obrigatório!']
  },
  email: {
    type: String,
    trim: true,
    minlength: [5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [150, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Enviar Para" é obrigatório!']
  },
  informacoesAdicionais: {
    type: String
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

AssuntoContatoSchema.pre('save', function(next) {

  next();
});

AssuntoContatoSchema.plugin(mongoosePaginate);
const AssuntoContato = mongoose.model('AssuntoContato', AssuntoContatoSchema);

module.exports = AssuntoContato;