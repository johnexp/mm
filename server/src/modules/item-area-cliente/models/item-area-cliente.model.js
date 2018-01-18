var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ItemAreaClienteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Título" é obrigatório!']
  },
  resumo: {
    type: String,
    trim: true,
    minlength: [5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    required: [true, 'O campo "Resumo" é obrigatório!']
  },
  cor: {
    type: String,
    default: 'blue',
    enum: ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'white', 'gray', 'gray-dark'],
    required: [true, 'O campo "Cor" é obrigatório!']
  },
  url: {
    type: String,
    trim: true,
    required: [true, 'O campo "URL" é obrigatório!']
  },
  icone: {
    type: String,
    trim: true,
    required: [true, 'O campo "Ícone" é obrigatório!']
  },
  home: {
    type: Boolean,
    default: false,
    required: [true, 'O campo "Exibir na Home" é obrigatório!']
  },
  ordem: {
    type: Number,
    required: [true, 'O campo "Ordem" é obrigatório!'],
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

ItemAreaClienteSchema.pre('save', function(next) {

  next();
});

ItemAreaClienteSchema.plugin(mongoosePaginate);
const ItemAreaCliente = mongoose.model('ItemAreaCliente', ItemAreaClienteSchema);

module.exports = ItemAreaCliente;