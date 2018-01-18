const ProdutoServicoService = require('../services/produto-servico.service'),
  FileService = require('../../../core/file/services/file.service'),
_this = this;

exports.getProdutoServico = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.titulo ? query.titulo = { $regex: new RegExp('^.*' + req.body.titulo.trim() + '.*', 'i') } : null;
  req.body.data ? query.data = req.body.data : null;
  req.body.descricao ? query.descricao = { $regex: new RegExp('^.*' + req.body.descricao.trim() + '.*', 'i') } : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var produtoServico = await ProdutoServicoService.getProdutoServico(query, page, limit, sort);
    return res.status(200).json(produtoServico);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllProdutoServico = async function (req, res, next) {
  try {
    var query = {};
    if (req.params.actives != null && req.params.actives !== undefined) {
      query.ativo = req.params.actives;
    }
    var produtoServico = await ProdutoServicoService.getAllProdutoServico(query);
    return res.status(200).json(produtoServico);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getProdutoServico = async function (req, res, next) {
  try {
    var produtoServico = await ProdutoServicoService.getProdutoServico(req.params.id);
    return res.status(200).json(produtoServico);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createProdutoServico = async function (req, res, next) {
  const body = JSON.parse(req.body.produtoServico);
  var data = null;
  if (body.data) {
    data = new Date(body.data);
    data = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate(), 0, 0, 0, 0);
  }

  var produtoServico = {
    titulo: body.titulo,
    data: data,
    descricao: body.descricao,
    imagem: body.imagem,
    ativo: body.ativo,
    usuario: req.user.sub
  };

  try {
    if (Array.isArray(req.files.file)) {
    }
    if (Array.isArray(req.files.image)) {
      produtoServico.imagem = await FileService.createOrUpdateFile(produtoServico.imagem, req.files.image[0]);
    }
    var createdProdutoServico = await ProdutoServicoService.createProdutoServico(produtoServico, req.user.sub);
    return res.status(201).json(createdProdutoServico);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateProdutoServico = async function (req, res, next) {
  const body = JSON.parse(req.body.produtoServico);
  if (!body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var data = null;
  if (body.data) {
    data = new Date(body.data);
    data = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate(), 0, 0, 0, 0);
  }
  var id = body._id;
  var produtoServico = {
    id,
    titulo: body.titulo ? body.titulo : null,
    data: data,
    descricao: body.descricao ? body.descricao : null,
    imagem: body.imagem ? body.imagem : null,
    ativo: body.ativo
  };

  try {
    if (Array.isArray(req.files.file)) {
    }
    if (Array.isArray(req.files.image)) {
      produtoServico.imagem = await FileService.createOrUpdateFile(produtoServico.imagem, req.files.image[0]);
    }
    var updatedProdutoServico = await ProdutoServicoService.updateProdutoServico(produtoServico, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedProdutoServico, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeProdutoServico = async function (req, res, next) {
  var id = req.params.id;

  try {
    var changed = await ProdutoServicoService.deleteProdutoServico(id, req.user.sub);
    return res.status(204).json({ status: 204, message: 'Registro alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
