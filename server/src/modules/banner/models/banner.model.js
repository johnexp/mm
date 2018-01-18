var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var BannerSchema = new mongoose.Schema({
  tituloL1: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [20, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Título (1ª Linha)" é obrigatório!']
  },
  tituloL2: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [20, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']
  },
  texto: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [100, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']
  },
  imagem: {
    type: mongoose.Schema.ObjectId,
    ref: 'File',
    required: [true, 'O campo "Imagem" é obrigatório!']
  },
  botoes: [{
    texto: {
      type: String,
      trim: true,
      default: 'Botão',
      required: true
    },
    url: {
      type: String,
      trim: true,
      required: true
    },
    cor: {
      type: String,
      default: 'primary',
      required: true,
      enum: ['primary', 'secondary', 'accent']
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

BannerSchema.pre('save', function (next) {

  next();
});

BannerSchema.plugin(mongoosePaginate);
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;