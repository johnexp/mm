const ItemAreaCliente = require('../models/item-area-cliente.model'),
  _this = this;

exports.getItemAreaCliente = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }]
  };

  try {
    var itemAreaCliente = await ItemAreaCliente.paginate(query, options);
    return itemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllItemAreaCliente = async function (query) {
  try {
    var itemAreaCliente = await ItemAreaCliente
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return itemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getActives = async function () {
  try {
    var itemAreaCliente = await ItemAreaCliente
      .find({ ativo: true })
      .sort('ordem')
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return itemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getItensHome = async function (query) {
  try {
    var itemAreaCliente = await ItemAreaCliente
      .find({ 'home': true, 'ativo': true })
      .sort('ordem');
    return itemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getItemAreaCliente = async function (id) {
  try {
    var itemAreaCliente = await ItemAreaCliente
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return itemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createItemAreaCliente = async function (itemAreaCliente, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newItemAreaCliente = new ItemAreaCliente({
    nome: itemAreaCliente.nome,
    titulo: itemAreaCliente.titulo,
    resumo: itemAreaCliente.resumo,
    cor: itemAreaCliente.cor,
    url: itemAreaCliente.url,
    icone: itemAreaCliente.icone,
    home: itemAreaCliente.home,
    ordem: itemAreaCliente.ordem,
    ativo: itemAreaCliente.ativo,
    usuario: itemAreaCliente.usuario
  });

  try {
    let listaItensPosteriores = await ItemAreaCliente.find({ ordem: { $gte: newItemAreaCliente.ordem } });
    var savedItemAreaCliente = await newItemAreaCliente.save();
    listaItensPosteriores.forEach(function (item) {
      item.ordem++;
      item.save();
    });
    this.createHistory(savedItemAreaCliente.id, savedItemAreaCliente, 'C', user);
    return savedItemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateItemAreaCliente = async function (itemAreaCliente, user) {
  var id = itemAreaCliente.id;

  try {
    var oldItemAreaCliente = await ItemAreaCliente.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldItemAreaCliente) {
    return false;
  }

  let ordemAntiga = oldItemAreaCliente.ordem;

  oldItemAreaCliente.nome = itemAreaCliente.nome;
  oldItemAreaCliente.titulo = itemAreaCliente.titulo;
  oldItemAreaCliente.resumo = itemAreaCliente.resumo;
  oldItemAreaCliente.cor = itemAreaCliente.cor;
  oldItemAreaCliente.url = itemAreaCliente.url;
  oldItemAreaCliente.icone = itemAreaCliente.icone;
  oldItemAreaCliente.ordem = itemAreaCliente.ordem;
  oldItemAreaCliente.home = itemAreaCliente.home;
  oldItemAreaCliente.ativo = itemAreaCliente.ativo;

  try {
    let listaItensAlterados = [];
    if (ordemAntiga && ordemAntiga !== itemAreaCliente.ordem) {
      if (ordemAntiga > itemAreaCliente.ordem) {
        listaItensAlterados = await ItemAreaCliente.find({ ordem: { $gte: itemAreaCliente.ordem, $lt: ordemAntiga } });
      } else {
        listaItensAlterados = await ItemAreaCliente.find({ ordem: { $lte: itemAreaCliente.ordem, $gt: ordemAntiga } });
      }
    }

    var savedItemAreaCliente = await oldItemAreaCliente.save();

    if (ordemAntiga && ordemAntiga !== itemAreaCliente.ordem) {
      if (ordemAntiga > itemAreaCliente.ordem) {
        // aumentar ordens maiores que ordemAntiga e menores ou igual que nova ordem
        listaItensAlterados.forEach(function (item) {
          item.ordem++;
          item.save();
        });
      } else {
        // diminuir ordens menores que ordemAntiga e maiores ou igual que nova ordem
        listaItensAlterados.forEach(function (item) {
          item.ordem--;
          item.save();
        });
      }
    }

    this.createHistory(id, savedItemAreaCliente, 'U', user);
    return savedItemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteItemAreaCliente = async function (id, user) {
  try {
    var itemAreaCliente = await ItemAreaCliente.findById(id);
    itemAreaCliente.ativo = !itemAreaCliente.ativo;
    var state = itemAreaCliente.ativo ? 'A' : 'I';
    var savedItemAreaCliente = await itemAreaCliente.save();
    this.createHistory(id, savedItemAreaCliente, state, user);
    return savedItemAreaCliente;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var itemAreaCliente = await ItemAreaCliente.findById(id).select('historico');
    obj.historico = undefined;
    itemAreaCliente.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await itemAreaCliente.save();
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getEnumValue = async function (field) {
  try {
    const path = ItemAreaCliente.schema.path(field);
    if (path.instance === 'Array') {
      return path.caster.enumValues;
    }
    return path.enumValues;
  } catch (e) {
    throw Error(e.message);
  }
}
