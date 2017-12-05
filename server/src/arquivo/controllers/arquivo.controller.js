var ArquivoService = require('../services/arquivo.service');
_this = this;

exports.getArquivos = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.nome ? query.nome = { $regex: new RegExp('^.*' + req.body.nome.trim() + '.*', 'i') } : null;
  req.body.descricao ? query.descricao = { $regex: new RegExp('^.*' + req.body.descricao.trim() + '.*', 'i') } : null;
  req.body.nomeArquivo ? query.nomeArquivo = { $regex: new RegExp('^.*' + req.body.nomeArquivo.trim() + '.*', 'i') } : null;

  try {
    var arquivos = await ArquivoService.getArquivos(query, page, limit, sort);
    return res.status(200).json(arquivos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros.', reason: e.message });
  }
}

exports.getAllArquivos = async function (req, res, next) {
  try {
    var arquivos = await ArquivoService.getAllArquivos();
    return res.status(200).json(arquivos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros.', reason: e.message });
  }
}

exports.getArquivo = async function (req, res, next) {
  try {
    var arquivos = await ArquivoService.getArquivo(req.params.id)
    return res.status(200).json(arquivos);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro.', reason: e.message });
  }
}

exports.createArquivo = async function (req, res, next) {
  const body = JSON.parse(req.body.arquivo);
  var arquivo = {
    nome: body.nome,
    descricao: body.descricao,
    nomeArquivo: body.nomeArquivo
  };

  try {
    var createdArquivo = await ArquivoService.createArquivo(arquivo, req.file);
    return res.status(201).json(createdArquivo);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro.', reason: e.messsage });
  }
}

exports.updateArquivo = async function (req, res, next) {
  const body = JSON.parse(req.body.arquivo);
  if (!body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado.' });
  }

  var id = body._id;
  var arquivo = {
    id,
    nome: body.nome ? body.nome : null,
    descricao: body.descricao ? body.descricao : null,
    caminhoArquivo: body.caminhoArquivo ? body.caminhoArquivo : null,
    nomeArquivoReal: body.nomeArquivoReal ? body.nomeArquivoReal : null,
    nomeArquivo: body.nomeArquivo ? body.nomeArquivo : null
  };

  try {
    var updatedArquivo = await ArquivoService.updateArquivo(arquivo, req.file);
    return res.status(200).json({ status: 200, data: updatedArquivo, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro.', reason: e.message });
  }
}

exports.removeArquivo = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await ArquivoService.deleteArquivo(id);
    return res.status(204).json({ status: 204, message: 'Registro removido com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro.', reason: e.message });
  }
}