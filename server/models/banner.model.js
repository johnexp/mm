var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var BannerSchema = new mongoose.Schema({
  titulo: {
    type: String,
    default: '',
    required: 'Preencha o campo "Título"',
    trim: true,
  },
  texto: {
    type: String,
    default: '',
    required: 'Preencha o campo "Texto"',
    trim: true,
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
  arquivo: {
    type: String,
    trim: true
  },
  nomeArquivo: {
    type: String
  }
});

BannerSchema.plugin(mongoosePaginate);
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;