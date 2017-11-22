var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var VersaoSchema = new mongoose.Schema({
  ticket: {
    type: String,
    default: '',
    required: 'Preencha o número do ticket',
    trim: true,
  },
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
  data: {
    type: Date,
    default: Date.now,
    required: 'Preencha a data da versão'
  }
})

VersaoSchema.plugin(mongoosePaginate)
const Versao = mongoose.model('Versao', VersaoSchema)

module.exports = Versao;