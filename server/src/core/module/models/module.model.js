var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ModuleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    trim: true,
    required: [true, 'O campo "Nome do Módulo" é obrigatório!'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
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

ModuleSchema.pre('save', function(next) {

  next();
});

ModuleSchema.plugin(mongoosePaginate);
const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;