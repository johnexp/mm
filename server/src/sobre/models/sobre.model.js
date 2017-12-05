var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var SobreSchema = new mongoose.Schema({
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

SobreSchema.plugin(mongoosePaginate);
const Sobre = mongoose.model('Sobre', SobreSchema);

module.exports = Sobre;