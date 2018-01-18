var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ApresentacaoSiteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: 'Preencha o campo "Título"',
    trim: true
  },
  subtitulo: {
    type: String,
    trim: true
  },
  urlVerMais: {
    type: String,
    trim: true
  },
  texto: {
    type: String,
    required: 'Preencha o campo "Texto"',
    trim: true
  }
});

ApresentacaoSiteSchema.plugin(mongoosePaginate);
const ApresentacaoSite = mongoose.model('ApresentacaoSite', ApresentacaoSiteSchema);

module.exports = ApresentacaoSite;