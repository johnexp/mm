var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var VersaoSchema = new mongoose.Schema({
  numeroVersao:  {
    type: String,
    default: '',
    required: 'Preencha o número da versão',
    trim: true
  },
  descricao:  {
    type: String,
    default: '',
    required: 'Preencha a descrição da versão',
    trim: true
  },
  dataPublicacao: {
    type: Date,
    default: Date.now,
    required: 'Preencha a data da publicação'
  },
  dataRelease: {
    type: Date,
    default: Date.now
  },
  tickets: [{
    ticket: {
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
    descricao: {
      type: String,
      default: '',
      required: 'Preencha a descrição da tarefa',
      trim: true
    }
  }],
})

VersaoSchema.plugin(mongoosePaginate)
const Versao = mongoose.model('Versao', VersaoSchema)

module.exports = Versao;