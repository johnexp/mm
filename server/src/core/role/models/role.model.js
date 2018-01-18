var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    trim: true,
    required: [true, 'O campo "Nome do Perfil" é obrigatório!'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  roleKey: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => {
        return /^[a-z_-]*$/g.test(v);
      },
      message: 'Caracteres inválidos! Somente letras, números e traços são permitidos.'
    },
    required: [true, 'O campo "Identificador" é obrigatório!'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  permissions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Permission'
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

RoleSchema.pre('save', function (next) {

  next();
});

RoleSchema.plugin(mongoosePaginate);
const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;