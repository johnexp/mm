var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var MenuSchema = new mongoose.Schema({
  label: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Label" é obrigatório!']
  },
  externo: {
    type: Boolean,
    required: [true, 'O campo "Externo" é obrigatório!']
  },
  endereco: {
    type: String,
    trim: true,
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Endereço" é obrigatório!']
  },
  ordem: {
    type: Number,
    required: [true, 'O campo "Ordem" é obrigatório!'],
    min: [1, 'O valor é menor que o mínimo permitido: ({MIN})']
  },
  submenus: [{
    label: {
      type: String,
      trim: true,
      minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
      maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
      required: [true, 'O campo "Label" é obrigatório!']
    },
    externo: {
      type: Boolean,
      required: [true, 'O campo "Externo" é obrigatório!']
    },
    endereco: {
      type: String,
      trim: true,
      maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
      required: [true, 'O campo "Endereço" é obrigatório!']
    },
    ordem: {
      type: Number,
      required: [true, 'O campo "Ordem" é obrigatório!'],
      min: [1, 'O valor é menor que o mínimo permitido: ({MIN})']
    }
  }],
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

MenuSchema.pre('save', function(next) {

  next();
});

MenuSchema.plugin(mongoosePaginate);
const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;