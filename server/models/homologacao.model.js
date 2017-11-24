var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var HomologacaoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    default: '',
    required: 'Preencha o campo "Descrição"',
    trim: true,
  },
  responsavel: {
    type: String,
    default: '',
    required: 'Preencha o campo "Responsável"',
    trim: true,
  },
  empresa: {
    type: String,
    default: '',
    required: 'Preencha o campo "Empresa"',
    trim: true,
  }
});

HomologacaoSchema.plugin(mongoosePaginate);
const Homologacao = mongoose.model('Homologacao', HomologacaoSchema);

module.exports = Homologacao;