var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ProdutoServicoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [50, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Título" é obrigatório!']
  },
  data: {
    type: Date,
    required: [true, 'O campo "Data" é obrigatório!']
  },
  descricao: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    required: [true, 'O campo "Descrição" é obrigatório!']
  },
  imagem: {
    type: mongoose.Schema.ObjectId,
    ref: 'File',
    required: [true, 'O campo "Imagem" é obrigatório!']
  },
  criacao: {
    type: Date,
    default: Date.now
  },
  historico: {
    type: [{
      _id: false,
      data: {
        type: Date
      },
      usuario: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      acao: {
        type: String
      },
      objeto: {
        type: String
      }
    }],
    select: false
  },
  ativo: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

ProdutoServicoSchema.pre('save', function(next) {

  next();
});

ProdutoServicoSchema.plugin(mongoosePaginate);
const ProdutoServico = mongoose.model('ProdutoServico', ProdutoServicoSchema);

module.exports = ProdutoServico;