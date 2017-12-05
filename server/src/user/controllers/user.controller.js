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

exports.getAllUsers = async function (req, res, next) {
  try {
    var users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
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
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var user = {
    id,
    username: req.body.username ? req.body.username : null,
    email: req.body.email ? req.body.email : null,
    password: req.body.password ? req.body.password : null,
    firstName: req.body.firstName ? req.body.firstName : null,
    lastName: req.body.lastName ? req.body.lastName : null
  };

  try {
    var updatedUser = await UserService.validateUserUpdating(user);
    return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}

exports.removeUser = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await UserService.deleteUser(id);
    return res.status(204).json({ status: 204, message: "Succesfully User Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}