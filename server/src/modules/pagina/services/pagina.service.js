const Pagina = require('../models/pagina.model'),
_this = this;

exports.getByPagina = async function (pagina) {
  try {
    var pagina = await Pagina
      .findOne({ pagina: pagina })
      .populate([{
        path: 'user',
        select: 'firstName'
      }]);
    return pagina;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createPagina = async function (pagina, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newPagina = new Pagina({
    nome: pagina.nome,
    titulo: pagina.titulo,
    resumo: pagina.resumo,
    conteudo: pagina.conteudo,
    pagina: pagina.pagina,
    usuario: pagina.usuario
  });

  try {
    var savedPagina = await newPagina.save();
    this.createHistory(savedPagina.id, savedPagina, 'C', user);
    return savedPagina;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updatePagina = async function (pagina, user) {
  var id = pagina.id;

  try {
    var oldPagina = await Pagina.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldPagina) {
    return false;
  }

  oldPagina.nome = pagina.nome;
  oldPagina.titulo = pagina.titulo;
  oldPagina.resumo = pagina.resumo;
  oldPagina.conteudo = pagina.conteudo;

  try {
    var savedPagina = await oldPagina.save();
    this.createHistory(id, savedPagina, 'U', user);
    return savedPagina;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var pagina = await Pagina.findById(id).select('historico');
    obj.historico = undefined;
    pagina.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await pagina.save();
  } catch (e) {
    throw Error(e.message);
  }
}
