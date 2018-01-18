var UserService = require('../services/user.service');
_this = this;

exports.authenticate = async function (req, res) {
  try {
    var user = await UserService.authenticate(req.body.username, req.body.password);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.register = async function (req, res) {
  try {
    var createdUser = await UserService.createUser(req.body);
    return res.status(201).json(createdUser);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" });
  }
}

exports.getUser = async function (req, res, next) {
  try {
    var user = await UserService.getUser(req.params.id)
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.getAllUsers = async function (req, res, next) {
  try {
    var users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getUsers = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.roles ? query.roles = { $in: req.body.roles } : null;
  req.body.username ? query.username = { $regex: new RegExp('^.*' + req.body.username.trim() + '.*', 'i') } : null;
  req.body.firstName ? query.firstName = { $regex: new RegExp('^.*' + req.body.firstName.trim() + '.*', 'i') } : null;
  req.body.lastName ? query.lastName = { $regex: new RegExp('^.*' + req.body.lastName.trim() + '.*', 'i') } : null;
  req.body.email ? query.email = { $regex: new RegExp('^.*' + req.body.email.trim() + '.*', 'i') } : null;

  if (req.body.ativo != null && req.body.ativo !== undefined) {
    query.ativo = req.body.ativo;
  }

  try {
    var users = await UserService.getUsers(query, page, limit, sort);
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getCurrent = async function (req, res) {
  try {
    var users = await UserService.getUser(req.user.sub);
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.updateUser = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: 'Id não encontrado' });
  }

  var id = req.body._id;
  var user = {
    id,
    username: req.body.username ? req.body.username : null,
    email: req.body.email ? req.body.email : null,
    password: req.body.password ? req.body.password : null,
    firstName: req.body.firstName ? req.body.firstName : null,
    lastName: req.body.lastName ? req.body.lastName : null,
    roles: req.body.roles ? req.body.roles : null,
    ativo: req.body.ativo ? req.body.ativo : null
  };

  try {
    var updatedUser = await UserService.validateUserUpdating(user);
    return res.status(200).json({ status: 200, data: updatedUser, message: 'Usuário alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.updateSelf = async function (req, res, next) {
  if (!req.body._id || req.user.sub !== req.body._id) {
    return res.status(400).json({ status: 400, message: 'Id não encontrado' });
  }

  var id = req.user.sub;
  var user = {
    id,
    username: req.body.username ? req.body.username : null,
    email: req.body.email ? req.body.email : null,
    password: req.body.password ? req.body.password : null,
    firstName: req.body.firstName ? req.body.firstName : null,
    lastName: req.body.lastName ? req.body.lastName : null
  };

  if (req.user.roles.indexOf('admin') > -1) {
    user.ativo = req.body.ativo ? req.body.ativo : null;
    user.roles = req.body.roles ? req.body.roles : null;
  }

  try {
    var updatedUser = await UserService.validateUserUpdating(user);
    return res.status(200).json({ status: 200, data: updatedUser, message: 'Usuário alterado com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.removeUser = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await UserService.deleteUser(id);
    return res.status(204).json({ status: 204, message: 'Usuário removido com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}