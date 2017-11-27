var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ArquivoSchema = new mongoose.Schema({
  nome: {
    type: String,
    default: '',
    required: 'Preencha o campo "Nome"',
    trim: true,
  },
  descricao: {
    type: String,
    default: '',
    required: 'Preencha o campo "Descrição"',
    trim: true,
  },
  caminhoArquivo: {
    type: String,
    trim: true
  },
  nomeArquivoReal: {
    type: String
  },
  nomeArquivo: {
    type: String
  }
});

ArquivoSchema.plugin(mongoosePaginate);
const Arquivo = mongoose.model('Arquivo', ArquivoSchema);

module.exports = Arquivo;