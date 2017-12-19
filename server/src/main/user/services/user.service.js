var config = require('../../../../config.json');
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
_this = this;

exports.authenticate = async function (username, password) {
  try {
    var user = await User.findOne({ username: username, active: true })
      .populate({ path: 'permissions', select: 'stringfied ' });
    if (!bcrypt.compareSync(password, user.hash)) {
      throw Error('Usuário e/ou senha incorretos');
    } else {
      user = user.toObject();
      user.token = jwt.sign({
        sub: user._id,
        permissions: user.permissions.map(permission => permission.stringfied),
        roles: user.roles
      }, config.secret);
      delete user.hash;
    }
    return user;
  } catch (e) {
    throw Error('Usuário e/ou senha incorretos');
  }
}

exports.getAllUsers = async function () {
  try {
    var users = await User.find().select('-hash');
    return users;
  } catch (e) {
    throw Error('Error while getting all Users');
  }
}

exports.getUser = async function (id) {
  try {
    var user = await User.findById(id).populate('permissions').select('-hash');
    return user;
  } catch (e) {
    throw Error('Error while getting a Versão');
  }
}

exports.createUser = async function (user) {
  // Creating a new Mongoose Object by using the new keyword
  var newUser = new User({
    username: user.username,
    email: user.email,
    hash: bcrypt.hashSync(user.password, 10),
    firstName: user.firstName,
    lastName: user.lastName,
    permissions: user.permissions || [],
    roles: ['user'],
    active: true
  });

  try {
    var existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
      throw Error('O nome de usuário já existe. Por favor escolha outro nome de usuário.');
    }
    existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw Error('O email escolhido já foi registrado, por favor escolha outro email.');
    }

    var savedUser = await newUser.save();
    return savedUser;
  } catch (e) {
    throw Error(e);
  }
}

exports.validateUserUpdating = async function (user) {
  var id = user.id;
  var oldUser;

  try {
    oldUser = await User.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }

  if (!oldUser) {
    return false;
  }

  /*
   * verifica se o nome de usuário foi alterado para checar se o
   * nome de usuário escolhido já existe no banco de dados
   * (O mesmo para o email)
   */
  if (user.username !== oldUser.username) {
    User.findOne({ username: user.username }, function (err, user) {
      if (user) {
        throw Error('O nome de usuário já existe. Por favor escolha outro nome de usuário.');
      } else {
        return this.updateUser(oldUser, user);
      }
    });
  } else {
    return this.updateUser(oldUser, user);
  }
}

exports.updateUser = async function (oldUser, user) {
  oldUser.username = user.username;
  oldUser.email = user.email;
  oldUser.firstName = user.firstName;
  oldUser.lastname = user.lastName;
  oldUser.permissions = user.permissions;
  oldUser.active = user.active;
  if (user.password) {
    oldUser.hash = bcrypt.hashSync(user.password, 10);
  }
  try {
    var savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
}

exports.deleteUser = async function (id) {
  try {
    var deleted = await User.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("User Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the User");
  }
}