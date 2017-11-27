var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ItemProgressoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    default: '',
    required: 'Preencha o campo "Nome"',
    trim: true,
  },
  subtitulo: {
    type: String,
    default: '',
    required: 'Preencha o campo "Nome"',
    trim: true,
  },
  progresso: {
    type: Number,
    min: 0,
    max: 100,
    required: 'Preencha o campo "progresso"',
  }
});

ItemProgressoSchema.plugin(mongoosePaginate);
const ItemProgresso = mongoose.model('ItemProgresso', ItemProgressoSchema);

module.exports = ItemProgresso;