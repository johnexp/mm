const ParceiroService = require('../services/parceiro.service'),
  FileService = require('../../../core/file/services/file.service'),
_this = this;

exports.getParceiros = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.nome ? query.nome = { $regex: new RegExp('^.*' + req.body.nome.trim() + '.*', 'i') } : null;
  req.body.tipo ? query.tipo = { $regex: new RegExp('^.*' + req.body.tipo.trim() + '.*', 'i') } : null;
  req.body.url ? query.url = { $regex: new RegExp('^.*' + req.body.url.trim() + '.*', 'i') } : null;
  req.body.ordem ? query.ordem = req.body.ordem : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var parceiros = await ParceiroService.getParceiros(query, page, limit, sort);
    return res.status(200).json(parceiros);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllParceiros = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var parceiros = await ParceiroService.getAllParceiros(query);
    return res.status(200).json(parceiros);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getParceiro = async function (req, res, next) {
  try {
    var parceiros = await ParceiroService.getParceiro(req.params.id);
    return res.status(200).json(parceiros);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.getByTipo = async function (req, res, next) {
  try {
    var parceiros = await ParceiroService.getByTipo(req.params.tipoParceiro);
    return res.status(200).json(parceiros);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createParceiro = async function (req, res, next) {
  const body = JSON.parse(req.body.parceiro);

  var parceiro = {
    nome: body.nome,
    tipo: body.tipo,
    imagem: body.imagem,
    url: body.url,
    ordem: body.ordem,
    ativo: body.ativo,
    usuario: req.user.sub
  };

  try {
    if (Array.isArray(req.files.file)) {
    }
    if (Array.isArray(req.files.image)) {
      parceiro.imagem = await FileService.createOrUpdateFile(parceiro.imagem, req.files.image[0]);
    }
    var createdParceiro = await ParceiroService.createParceiro(parceiro, req.user.sub);
    return res.status(201).json(createdParceiro);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateParceiro = async function (req, res, next) {
  const body = JSON.parse(req.body.parceiro);
  if (!body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var id = body._id;
  var parceiro = {
    id,
    nome: body.nome ? body.nome : null,
    tipo: body.tipo ? body.tipo : null,
    imagem: body.imagem ? body.imagem : null,
    url: body.url ? body.url : null,
    ordem: body.ordem ? body.ordem : null,
    ativo: body.ativo
  };

  try {
    if (Array.isArray(req.files.file)) {
    }
    if (Array.isArray(req.files.image)) {
      parceiro.imagem = await FileService.createOrUpdateFile(parceiro.imagem, req.files.image[0]);
    }
    var updatedParceiro = await ParceiroService.updateParceiro(parceiro, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedParceiro, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeParceiro = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await ParceiroService.deleteParceiro(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}

exports.getEnumValue = async function (req, res, next) {
  try {
    var enumValues = await ParceiroService.getEnumValue(req.params.field);
    return res.status(200).json(enumValues);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar obter os valores do campo "' + field + '": ' + e });
  }
}
