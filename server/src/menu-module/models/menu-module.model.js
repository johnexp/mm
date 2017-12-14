var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var MenuModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'O campo "Nome do Menu" é obrigatório!'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  label: {
    type: String,
    trim: true,
    required: [true, 'O campo "Label" é obrigatório!'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  roles: {
    type: [{ type: String, default: 'admin',  enum: ['admin', 'user', 'guest'] }],
    required: true
  },
  menus: {
    type: [{
      label: {
        type: String,
        trim: true,
        required: true
      },
      icon: {
        type: String,
        trim: true,
        required: true
      },
      path: {
        type: String,
        trim: true,
        required: true
      }
    }],
    required: false
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

MenuModuleSchema.pre('save', function (next) {

  next();
});

MenuModuleSchema.plugin(mongoosePaginate);
const MenuModule = mongoose.model('MenuModule', MenuModuleSchema);

module.exports = MenuModule;