const Banner = require('../models/banner.model'),
  _this = this;

exports.getBanneres = async function (query, page, limit, sort) {
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
    }, {
      path: 'botoes'
    }]
  };

  try {
    var banneres = await Banner.paginate(query, options);
    return banneres;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllBanneres = async function () {
  try {
    var banneres = await Banner
      .find({ ativo: true })
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'imagem'
      }, {
        path: 'botoes'
      }]);
    return banneres;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getBanner = async function (id) {
  try {
    var banner = await Banner
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'imagem'
      }, {
        path: 'botoes'
      }]);
    return banner;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createBanner = async function (banner, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newBanner = new Banner({
    nome: banner.nome,
    tituloL1: banner.tituloL1,
    tituloL2: banner.tituloL2,
    texto: banner.texto,
    imagem: banner.imagem,
    botoes: banner.botoes,
    usuario: banner.usuario
  });

  try {
    var savedBanner = await newBanner.save();
    this.createHistory(savedBanner.id, savedBanner, 'C', user);
    return savedBanner;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateBanner = async function (banner, user) {
  var id = banner.id;

  try {
    var oldBanner = await Banner.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldBanner) {
    return false;
  }

  oldBanner.nome = banner.nome;
  oldBanner.tituloL1 = banner.tituloL1;
  oldBanner.tituloL2 = banner.tituloL2;
  oldBanner.texto = banner.texto;
  oldBanner.imagem = banner.imagem;
  oldBanner.botoes = banner.botoes;

  try {
    var savedBanner = await oldBanner.save();
    this.createHistory(id, savedBanner, 'U', user);
    return savedBanner;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteBanner = async function (id) {
  try {
    var deleted = await Banner.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Banner Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.changeBannerState = async function (id, user) {
  try {
    var banner = await Banner.findById(id);
    banner.ativo = !banner.ativo;
    var state = banner.ativo ? 'A' : 'I';
    var savedBanner = await banner.save();
    this.createHistory(id, savedBanner, state, user);
    return savedBanner;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var banner = await Banner.findById(id).select('historico');
    obj.historico = undefined;
    banner.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await banner.save();
  } catch (e) {
    throw Error(e.message);
  }
}
