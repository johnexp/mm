var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var HomologacaoSchema = new mongoose.Schema({
  nome: {
    type: String,
    default: '',
    required: 'Preencha o campo nome',
    trim: true,
  }
});

HomologacaoSchema.plugin(mongoosePaginate);
const Homologacao = mongoose.model('Homologacao', HomologacaoSchema);

module.exports = Homologacao;