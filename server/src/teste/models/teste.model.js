var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var TesteSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    required: [true, 'Por quê não há nome?'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  descricao: {
    type: String,
    trim: true,
    required: [true, 'Por quê não há descrição?'],
    maxlength: [200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})'],
    minlength: [5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']
  },
  definitivo: {
    type: Boolean,
    required: [true, 'Por quê não dizer se é definitivo?'],
    default: false
  },
  dataInicio: {
    type: Date,
    default: Date.now,
    max: new Date('December 31, 2018 23:59:59'),
    min: new Date().setHours(0, 0, 0, 0),
    required: 'A data de início é obrigatória.'
  },
  quantidade: {
    type: Number,
    required: 'A quantidade é obrigatória',
    max: [100, 'Quantidade superior ao limite'],
    min: [5, 'Quantidade inferior ao mínimo'],
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  cor: {
    type: String,
    default: '',
    enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow']
  },
  cores: {
    type: [{ type: String, enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow'] }],
    required: true
  },
  selectCores: {
    type: [{ type: String, enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow'] }],
    required: false
  },
  provisorio: {
    type: Boolean,
    required: [true, 'Por quê não dizer se é provisório?'],
    default: false
  },
  membro: {
    type: mongoose.Schema.ObjectId,
    ref: 'Membro',
    required: [false, 'Por quê não selecionar um "Membro"?']
  },
  membros: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Membro" }],
    required: [false, 'Por quê não selecionar "Membros"?']
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