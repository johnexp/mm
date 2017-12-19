const Teste = require('../models/teste.model'),
_this = this;

exports.getTestes = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }, {
      path: 'membro',
      select: 'nome'
    }, {
      path: 'membros',
      select: 'nome'
    }, {
      path: 'documento'
    }, {
      path: 'imagem'
    }]
  };

  try {
    var testes = await Teste.paginate(query, options);
    return testes;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllTestes = async function (query) {
  try {
    var testes = await Teste
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'membro',
        select: 'nome'
      }, {
        path: 'membros',
        select: 'nome'
      }, {
        path: 'documento'
      }, {
        path: 'imagem'
      }]);
    return testes;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getTeste = async function (id) {
  try {
    var teste = await Teste
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'membro',
        select: 'nome'
      }, {
        path: 'membros',
        select: 'nome'
      }, {
        path: 'documento'
      }, {
        path: 'imagem'
      }]);
    return teste;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createTeste = async function (teste, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newTeste = new Teste({
    nome: teste.nome,
    nome: teste.nome,
    descricao: teste.descricao,
    definitivo: teste.definitivo,
    dataInicio: teste.dataInicio,
    quantidade: teste.quantidade,
    cor: teste.cor,
    cores: teste.cores,
    selectCores: teste.selectCores,
    membro: teste.membro,
    membros: teste.membros,
    documento: teste.documento,
    imagem: teste.imagem,
    ativo: teste.ativo,
    usuario: teste.usuario
  });

  try {
    var savedTeste = await newTeste.save();
    this.createHistory(savedTeste.id, savedTeste, 'C', user);
    return savedTeste;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateTeste = async function (teste, user) {
  var id = teste.id;

  try {
    var oldTeste = await Teste.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldTeste) {
    return false;
  }

  oldTeste.nome = teste.nome;
  oldTeste.nome = teste.nome;
  oldTeste.descricao = teste.descricao;
  oldTeste.definitivo = teste.definitivo;
  oldTeste.dataInicio = teste.dataInicio;
  oldTeste.quantidade = teste.quantidade;
  oldTeste.cor = teste.cor;
  oldTeste.cores = teste.cores;
  oldTeste.selectCores = teste.selectCores;
  oldTeste.membro = teste.membro;
  oldTeste.membros = teste.membros;
  oldTeste.documento = teste.documento;
  oldTeste.imagem = teste.imagem;
  oldTeste.ativo = teste.ativo;

  try {
    var savedTeste = await oldTeste.save();
    this.createHistory(id, savedTeste, 'U', user);
    return savedTeste;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteTeste = async function (id, user) {
  try {
    var teste = await Teste.findById(id);
    teste.ativo = !teste.ativo;
    var state = teste.ativo ? 'A' : 'I';
    if (teste.cor === null || teste.cor === '') {
      teste.cor = undefined;
    }
    if (teste.selectCores === null || teste.selectCores === '') {
      teste.selectCores = undefined;
    }
    var savedTeste = await teste.save();
    this.createHistory(id, savedTeste, state, user);
    return savedTeste;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var teste = await Teste.findById(id).select('historico');
    obj.historico = undefined;
    teste.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await teste.save();
  } catch (e) {
    throw Error(e.message);
  }
}
  
exports.getEnumValue = async function (field) {
  try {
    const path = Teste.schema.path(field);
    if (path.instance === 'Array') {
      return path.caster.enumValues;
    }
    return path.enumValues;
  } catch (e) {
    throw Error(e.message);
  }
}
