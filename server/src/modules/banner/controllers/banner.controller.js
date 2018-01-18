const BannerService = require('../services/banner.service'),
  FileService = require('../../../core/file/services/file.service'),
_this = this;

exports.getBanneres = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.tituloL1 ? query.tituloL1 = { $regex: new RegExp('^.*' + req.body.tituloL1.trim() + '.*', 'i') } : null;
  req.body.tituloL2 ? query.tituloL2 = { $regex: new RegExp('^.*' + req.body.tituloL2.trim() + '.*', 'i') } : null;
  req.body.texto ? query.texto = { $regex: new RegExp('^.*' + req.body.texto.trim() + '.*', 'i') } : null;


  try {
    var banneres = await BannerService.getBanneres(query, page, limit, sort);
    return res.status(200).json(banneres);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllBanneres = async function (req, res, next) {
  try {
    var banneres = await BannerService.getAllBanneres();
    return res.status(200).json(banneres);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getBanner = async function (req, res, next) {
  try {
    var banneres = await BannerService.getBanner(req.params.id);
    return res.status(200).json(banneres);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createBanner = async function (req, res, next) {
  const body = JSON.parse(req.body.banner);

  let botoes = null;
  if (body.botoes) {
    for (let i = 0; i < body.botoes.length; i++) {
      if (body.botoes[i]._id.startsWith('___')) {
        delete body.botoes[i]._id;
      }
    }
    botoes = body.botoes;
  }
  var banner = {
    tituloL1: body.tituloL1,
    tituloL2: body.tituloL2,
    texto: body.texto,
    imagem: body.imagem,
    botoes: botoes,
    usuario: req.user.sub
  };

  try {
    if (Array.isArray(req.files.file)) {
    }
    if (Array.isArray(req.files.image)) {
      banner.imagem = await FileService.createOrUpdateFile(banner.imagem, req.files.image[0]);
    }
    var createdBanner = await BannerService.createBanner(banner, req.user.sub);
    return res.status(201).json(createdBanner);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateBanner = async function (req, res, next) {
  const body = JSON.parse(req.body.banner);
  if (!body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  let botoes = null;
  if (body.botoes) {
    for (let i = 0; i < body.botoes.length; i++) {
      if (body.botoes[i]._id.startsWith('___')) {
        delete body.botoes[i]._id;
      }
    }
    botoes = body.botoes;
  }
  var id = body._id;
  var banner = {
    id,
    tituloL1: body.tituloL1 ? body.tituloL1 : null,
    tituloL2: body.tituloL2 ? body.tituloL2 : null,
    texto: body.texto ? body.texto : null,
    botoes: botoes,
    imagem: body.imagem ? body.imagem : null,
  };

  try {
    if (Array.isArray(req.files.image)) {
      banner.imagem = await FileService.createOrUpdateFile(banner.imagem, req.files.image[0]);
    }
    var updatedBanner = await BannerService.updateBanner(banner, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedBanner, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeBanner = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await BannerService.deleteBanner(id);
    return res.status(204).json({ status: 204, message: 'Registro removido com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}

exports.changeBannerState = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await BannerService.changeBannerState(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
