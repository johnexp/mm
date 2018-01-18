var MenuModuleService = require('../services/menu-module.service');
_this = this;

exports.getMenuModule = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.name ? query.name = { $regex: new RegExp('^.*' + req.body.name.trim() + '.*', 'i') } : null;
  req.body.label ? query.label = { $regex: new RegExp('^.*' + req.body.label.trim() + '.*', 'i') } : null;
  req.body.menus ? query.menus = { $regex: new RegExp('^.*' + req.body.menus.trim() + '.*', 'i') } : null;

  try {
    var menuModule = await MenuModuleService.getMenuModule(query, page, limit, sort);
    return res.status(200).json(menuModule);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllMenuModule = async function (req, res, next) {
  try {
    var menuModule = await MenuModuleService.getAllMenuModule();
    return res.status(200).json(menuModule);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getByName = async function (req, res, next) {
  try {
    var menuModule = await MenuModuleService.getByName(req.params.name, req.user);
    return res.status(200).json(menuModule);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getModules = async function (req, res, next) {
  try {
    var menuModule = await MenuModuleService.getModules(req.user);
    return res.status(200).json(menuModule);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getMenuModule = async function (req, res, next) {
  try {
    var menuModule = await MenuModuleService.getMenuModule(req.params.id)
    return res.status(200).json(menuModule);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createMenuModule = async function (req, res, next) {
  var menus = null;
  if (req.body.menus) {
    for (var i = 0; i < req.body.menus.length; i++) {
      if (req.body.menus[i]._id.startsWith('___')) {
        delete req.body.menus[i]._id;
      }
    }
    menus = req.body.menus;
  }
  var menuModule = {
    name: req.body.name,
    label: req.body.label,
    roles: req.body.roles,
    menus: menus,
    usuario: req.user.sub
  };

  try {
    var createdMenuModule = await MenuModuleService.createMenuModule(menuModule, req.user.sub);
    return res.status(201).json(createdMenuModule);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateMenuModule = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: 'Id do registro não encontrado: ' + e });
  }

  var menus = null;
  if (req.body.menus) {
    for (var i = 0; i < req.body.menus.length; i++) {
      if (req.body.menus[i]._id && req.body.menus[i]._id.startsWith('___')) {
        delete req.body.menus[i]._id;
      }
    }
    menus = req.body.menus;
  }
  var id = req.body._id;
  var menuModule = {
    id,
    name: req.body.name ? req.body.name : null,
    label: req.body.label ? req.body.label : null,
    roles: req.body.roles ? req.body.roles : null,
    menus: menus,
  };

  try {
    var updatedMenuModule = await MenuModuleService.updateMenuModule(menuModule, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedMenuModule, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400., message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeMenuModule = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await MenuModuleService.deleteMenuModule(id);
    return res.status(204).json({ status: 204, message: 'Registro removido com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}

exports.getEnumValue = async function (req, res, next) {
  try {
    var enumValues = await MenuModuleService.getEnumValue(req.params.field);
    return res.status(200).json(enumValues);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar obter os valores do campo "' + field + '": ' + e });
  }
}
