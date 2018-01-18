var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ActionSchema = new mongoose.Schema({
  actionName: {
    type: String,
    trim: true,
    required: [true, 'O campo "Nome da Ação" é obrigatório!'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  dependants: {
    type: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Action'
    }]
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

ActionSchema.pre('save', function(next) {

  next();
});

ActionSchema.plugin(mongoosePaginate);
const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;