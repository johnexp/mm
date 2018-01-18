const Parceiro = require('../models/parceiro.model'),
  _this = this;

exports.getParceiros = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }, {
      path: 'imagem'
    }]
  };

  try {
    var parceiros = await Parceiro.paginate(query, options);
    return parceiros;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllParceiros = async function (query) {
  try {
    var parceiros = await Parceiro
      .find(query)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'imagem'
      }]);
    return parceiros;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getParceiro = async function (id) {
  try {
    var parceiro = await Parceiro
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'imagem'
      }]);
    return parceiro;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getByTipo = async function (tipoParceiro) {
  try {
    var parceiro = await Parceiro
      .find({ tipo: tipoParceiro })
      .sort('ordem')
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'imagem'
      }]);
    return parceiro;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createParceiro = async function (parceiro, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newParceiro = new Parceiro({
    nome: parceiro.nome,
    nome: parceiro.nome,
    tipo: parceiro.tipo,
    imagem: parceiro.imagem,
    url: parceiro.url,
    ordem: parceiro.ordem,
    ativo: parceiro.ativo,
    usuario: parceiro.usuario
  });

  try {
    let listaParceirosPosteriores = await Parceiro.find({ ordem: { $gte: newParceiro.ordem } });
    var savedParceiro = await newParceiro.save();
    listaParceirosPosteriores.forEach(function (parceiro) {
      parceiro.ordem++;
      parceiro.save();
    });
    this.createHistory(savedParceiro.id, savedParceiro, 'C', user);
    return savedParceiro;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateParceiro = async function (parceiro, user) {
  var id = parceiro.id;

  try {
    var oldParceiro = await Parceiro.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldParceiro) {
    return false;
  }

  let ordemAntiga = oldParceiro.ordem;

  oldParceiro.nome = parceiro.nome;
  oldParceiro.nome = parceiro.nome;
  oldParceiro.tipo = parceiro.tipo;
  oldParceiro.imagem = parceiro.imagem;
  oldParceiro.url = parceiro.url;
  oldParceiro.ordem = parceiro.ordem;
  oldParceiro.ativo = parceiro.ativo;

  try {
    let listaParceirosAlterados = [];
    if (ordemAntiga !== parceiro.ordem) {
      if (ordemAntiga > parceiro.ordem) {
        listaParceirosAlterados = await Parceiro.find({ ordem: { $gte: parceiro.ordem, $lt: ordemAntiga } });
      } else {
        listaParceirosAlterados = await Parceiro.find({ ordem: { $lte: parceiro.ordem, $gt: ordemAntiga } });
      }
    }

    var savedParceiro = await oldParceiro.save();

    if (ordemAntiga !== parceiro.ordem) {
      if (ordemAntiga > parceiro.ordem) {
        // aumentar ordens maiores que ordemAntiga e menores ou igual que nova ordem
        listaParceirosAlterados.forEach(function (parceiro) {
          parceiro.ordem++;
          parceiro.save();
        });
      } else {
        // diminuir ordens menores que ordemAntiga e maiores ou igual que nova ordem
        listaParceirosAlterados.forEach(function (parceiro) {
          parceiro.ordem--;
          parceiro.save();
        });
      }
    }

    this.createHistory(id, savedParceiro, 'U', user);
    return savedParceiro;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteParceiro = async function (id, user) {
  try {
    var parceiro = await Parceiro.findById(id);
    parceiro.ativo = !parceiro.ativo;
    var state = parceiro.ativo ? 'A' : 'I';
    var savedParceiro = await parceiro.save();
    this.createHistory(id, savedParceiro, state, user);
    return savedParceiro;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var parceiro = await Parceiro.findById(id).select('historico');
    obj.historico = undefined;
    parceiro.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await parceiro.save();
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getEnumValue = async function (field) {
  try {
    const path = Parceiro.schema.path(field);
    if (path.instance === 'Array') {
      return path.caster.enumValues;
    }
    return path.enumValues;
  } catch (e) {
    throw Error(e.message);
  }
}
