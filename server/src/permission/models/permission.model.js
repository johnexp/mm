var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PermissionSchema = new mongoose.Schema({
  action: {
    type: mongoose.Schema.ObjectId,
    ref: 'Action',
    required: [false, 'O campo "Ação" é obrigatório!']
  },
  module: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module',
    required: [false, 'O campo "Módulo" é obrigatório!']
  },
  stringfied: {
    type: String,
    required: [true, 'O campo "Permissão Compilada" é obrigatório!']
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

PermissionSchema.pre('save', function(next) {

  next();
});

PermissionSchema.plugin(mongoosePaginate);
const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;