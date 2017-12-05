var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var WikiSchema = new mongoose.Schema({
  titulo: {
    type: String,
    default: '',
    required: 'Preencha o campo "Título"',
    trim: true,
  },
  descricao: {
    type: String,
    default: '',
    required: 'Preencha o campo "Descrição"',
    trim: true,
  },
  dataPublicacao: {
    type: Date,
    default: Date.now()
  },
  dataCriacao: {
    type: Date,
    default: Date.now()
  },
  conteudo: {
    type: String,
    required: 'Preencha o campo "Conteúdo"'
  }
});

WikiSchema.plugin(mongoosePaginate);
const Wiki = mongoose.model('Wiki', WikiSchema);

module.exports = Wiki;