var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ApresentacaoPlanosSchema = new mongoose.Schema({
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

ApresentacaoPlanosSchema.plugin(mongoosePaginate);
const ApresentacaoPlanos = mongoose.model('ApresentacaoPlanos', ApresentacaoPlanosSchema);

module.exports = ApresentacaoPlanos;