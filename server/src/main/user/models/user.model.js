var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: '',
    required: 'Preencha o campo "Usuário"',
    trim: true,
  },
  email: {
    type: String,
    default: '',
    required: 'Preencha o campo "Email"',
    trim: true
  },
  hash: {
    type: String,
    default: '',
    required: 'Preencha o campo "Senha"',
    trim: true
  },
  firstName: {
    type: String,
    default: '',
    required: 'Preencha o campo "Nome"',
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: 'Preencha o campo "Sobrenome"',
    trim: true
  },
  roles: {
    type: [{ type: String, default: 'user', enum: ['admin', 'user', 'guest'] }],
    required: true
  },
  permissions: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Permission" }],
    required: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

UserSchema.virtual('token')
  .get(function () {
    return this._token;
  })
  .set(function (token) {
    return this._token = token;
  });

UserSchema.set('toObject', {
  getters: true
});

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

module.exports = User;