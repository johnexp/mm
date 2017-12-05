var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ApresentacaoSiteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    default: '',
    required: 'Preencha o campo "Título"',
    trim: true,
  },
  subtitulo: {
    type: String,
    default: '',
    required: 'Preencha o campo "Subtítulo"',
    trim: true,
  },
  texto: {
    type: String,
    default: '',
    required: 'Preencha o campo "Texto"',
    trim: true,
  }
});

ApresentacaoSiteSchema.plugin(mongoosePaginate);
const ApresentacaoSite = mongoose.model('ApresentacaoSite', ApresentacaoSiteSchema);

module.exports = ApresentacaoSite;