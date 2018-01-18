var config = require('../../../../config.json');
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
_this = this;

exports.authenticate = async (username, password) => {
  try {
    var user = await User.findOne({ username: username, ativo: true })
      .populate({
        path: 'roles',
        select: 'roleName roleKey permissions',
        populate: {
          path: 'permissions',
          select: 'stringfied'
        }
      });
    if (!bcrypt.compareSync(password, user.hash)) {
      throw Error('Usuário e/ou senha incorretos');
    } else {
      const permissions = user.roles.map(role => role.permissions.map(permission => permission.stringfied));
      const roles = user.roles.map(role => role.roleKey);
      user = user.toObject();
      user.permissions = [];
      permissions.forEach((permission) => {
        user.permissions.push(...permission);
      });
      user.roles = roles;
      user.token = jwt.sign({
        sub: user._id,
        permissions: user.permissions,
        roles: roles
      }, config.secret);
      delete user.hash;
    }
    return user;
  } catch (e) {
    throw Error('Usuário e/ou senha incorretos');
  }
}

exports.getUsers = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'roles',
      select: 'roleName roleKey'
    }]
  };

  try {
    var users = await User.paginate(query, options);
    return users;
  } catch (e) {
    throw Error(e.message);
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
    var user = await User.findById(id)
      .populate({
        path: 'roles',
        populate: {
          path: 'permissions',
          select: 'stringfied'
        }
      })
      .select('-hash');
    return user;
  } catch (e) {
    throw Error('Ocorreu um erro ao tentar buscar o usuário.');
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
    roles: user.roles || [],
    ativo: true
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
  if (user.roles !== undefined) {
    oldUser.roles = user.roles;
  }
  if (user.ativo !== undefined) {
    oldUser.ativo = user.ativo;
  }
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