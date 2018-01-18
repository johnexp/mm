var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ParamSchema = new mongoose.Schema({
  key: {
    type: String,
    trim: true,
    uppercase: true,
    validate: {
      validator: (v) => {
        return /^[A-Z_]*$/g.test(v);
      },
      message: 'Caracteres inválidos! Somente letras, números e sublinhados são permitidos.'
    },
    required: [true, 'O campo "Chave" é obrigatório!'],
    maxlength: [100, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  value: {
    type: String,
    trim: true,
    required: [true, 'O campo "Valor" é obrigatório!'],
    maxlength: [500, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'O campo "Descrição" é obrigatório!'],
    maxlength: [500, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
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

ParamSchema.pre('save', function(next) {

  next();
});

ParamSchema.plugin(mongoosePaginate);
const Param = mongoose.model('Param', ParamSchema);

module.exports = Param;