var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var DepoimentoSchema = new mongoose.Schema({
  empresa: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Empresa" é obrigatório!']
  },
  depoimento: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    required: [true, 'O campo "Depoimento" é obrigatório!']
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

DepoimentoSchema.pre('save', function(next) {

  next();
});

DepoimentoSchema.plugin(mongoosePaginate);
const Depoimento = mongoose.model('Depoimento', DepoimentoSchema);

module.exports = Depoimento;