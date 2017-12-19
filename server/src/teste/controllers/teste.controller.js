const TesteService = require('../services/teste.service'),
  FileService = require('../../main/file/services/file.service'),
_this = this;

exports.getTestes = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.nome ? query.nome = { $regex: new RegExp('^.*' + req.body.nome.trim() + '.*', 'i') } : null;
  req.body.descricao ? query.descricao = { $regex: new RegExp('^.*' + req.body.descricao.trim() + '.*', 'i') } : null;
  req.body.dataInicio ? query.dataInicio = req.body.dataInicio : null;
  req.body.quantidade ? query.quantidade = req.body.quantidade : null;
  req.body.cor ? query.cor = { $regex: new RegExp('^.*' + req.body.cor.trim() + '.*', 'i') } : null;
  req.body.cores ? query.cores = { $regex: new RegExp('^.*' + req.body.cores.trim() + '.*', 'i') } : null;
  req.body.selectCores ? query.selectCores = { $regex: new RegExp('^.*' + req.body.selectCores.trim() + '.*', 'i') } : null;
  req.body.membro ? query.membro = req.body.membro : null;
  req.body.membros ? query.membros = { $in: req.body.membros } : null;

  if (req.body.definitivo != null && req.body.definitivo !== undefined) {
    query.definitivo = req.body.definitivo;
  }

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var testes = await TesteService.getTestes(query, page, limit, sort);
    return res.status(200).json(testes);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllTestes = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var testes = await TesteService.getAllTestes(query);
    return res.status(200).json(testes);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getTeste = async function (req, res, next) {
  try {
    var testes = await TesteService.getTeste(req.params.id);
    return res.status(200).json(testes);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createTeste = async function (req, res, next) {
  const body = JSON.parse(req.body.teste);
  var dataInicio = null;
  if (body.dataInicio) {
    dataInicio = new Date(body.dataInicio);
    dataInicio = new Date(dataInicio.getUTCFullYear(), dataInicio.getUTCMonth(), dataInicio.getUTCDate(), 0, 0, 0, 0);
  }

  var teste = {
    nome: body.nome,
    descricao: body.descricao,
    definitivo: body.definitivo,
    dataInicio: dataInicio,
    quantidade: body.quantidade,
    cor: body.cor,
    cores: body.cores,
    selectCores: body.selectCores,
    membro: body.membro,
    membros: body.membros,
    documento: body.documento,
    imagem: body.imagem,
    ativo: body.ativo,
    usuario: req.user.sub
  };

  try {
    if (Array.isArray(req.files.file)) {
      teste.documento = await FileService.createOrUpdateFile(teste.documento, req.files.file[0]);
    }
    if (Array.isArray(req.files.image)) {
      teste.imagem = await FileService.createOrUpdateFile(teste.imagem, req.files.image[0]);
    }
    var createdTeste = await TesteService.createTeste(teste, req.user.sub);
    return res.status(201).json(createdTeste);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateTeste = async function (req, res, next) {
  const body = JSON.parse(req.body.teste);
  if (!body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var dataInicio = null;
  if (body.dataInicio) {
    dataInicio = new Date(body.dataInicio);
    dataInicio = new Date(dataInicio.getUTCFullYear(), dataInicio.getUTCMonth(), dataInicio.getUTCDate(), 0, 0, 0, 0);
  }
  var id = body._id;
  var teste = {
    id,
    nome: body.nome ? body.nome : null,
    descricao: body.descricao ? body.descricao : null,
    definitivo: body.definitivo,
    dataInicio: dataInicio,
    quantidade: body.quantidade ? body.quantidade : null,
    cor: body.cor ? body.cor : null,
    cores: body.cores ? body.cores : null,
    selectCores: body.selectCores ? body.selectCores : null,
    membro: body.membro ? body.membro : null,
    membros: body.membros ? body.membros : null,
    documento: body.documento ? body.documento : null,
    imagem: body.imagem ? body.imagem : null,
    ativo: body.ativo
  };

  try {
    if (Array.isArray(req.files.file)) {
      teste.documento = await FileService.createOrUpdateFile(teste.documento, req.files.file[0]);
    }
    if (Array.isArray(req.files.image)) {
      teste.imagem = await FileService.createOrUpdateFile(teste.imagem, req.files.image[0]);
    }
    var updatedTeste = await TesteService.updateTeste(teste, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedTeste, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeTeste = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await TesteService.deleteTeste(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}

exports.getEnumValue = async function (req, res, next) {
  try {
    var enumValues = await TesteService.getEnumValue(req.params.field);
    return res.status(200).json(enumValues);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar obter os valores do campo "' + field + '": ' + e });
  }
}
