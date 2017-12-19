var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var TesteSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Nome" é obrigatório!']
  },
  descricao: {
    type: String,
    trim: true,
    minlength: [5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    required: [true, 'O campo "Descrição" é obrigatório!']
  },
  definitivo: {
    type: Boolean,
    default: false,
    required: [true, 'O campo "Definitivo?" é obrigatório!']
  },
  dataInicio: {
    type: Date,
    min: [new Date().setHours(0, 0, 0, 0), 'A data é anterior à data mínima permitida: ({MIN})'],
    max: [new Date('2018-01-01T01:59:59.000Z'), 'A data é posterior à data máxima permitida: ({MAX})'],
    default: Date.now,
    required: [true, 'O campo "Data de Início" é obrigatório!']
  },
  quantidade: {
    type: Number,
    min: [5, 'O valor é menor que o mínimo permitido: ({MIN})'],
    max: [100, 'O valor é maior que o máximo permitido: ({MAX})'],
    required: [true, 'O campo "Quantidade" é obrigatório!']
  },
  cor: {
    type: String,
    enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow']
  },
  cores: {
    type: [{ type: String, default: 'Vermelho', enum: ['Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow']}],
    required: [true, 'O campo "Cores" é obrigatório!']
  },
  selectCores: {
    type: [{ type: String, enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow']}]
  },
  membro: {
    type: mongoose.Schema.ObjectId,
    ref: 'Membro'
  },
  membros: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'Membro'}]
  },
  documento: {
    type: mongoose.Schema.ObjectId,
    ref: 'File',
    required: [true, 'O campo "Documento" é obrigatório!']
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

TesteSchema.pre('save', function(next) {
  if (this.cor === null || this.cor === '') {
    this.cor = undefined;
  }
  if (this.selectCores === null || this.selectCores === '') {
    this.selectCores = undefined;
  }

  next();
});

TesteSchema.plugin(mongoosePaginate);
const Teste = mongoose.model('Teste', TesteSchema);

module.exports = Teste;