const MenuService = require('../services/menu.service'),
  _this = this;

exports.getMenus = async function (req, res, next) {

  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.label ? query.label = { $regex: new RegExp('^.*' + req.body.label.trim() + '.*', 'i') } : null;
  req.body.endereco ? query.endereco = { $regex: new RegExp('^.*' + req.body.endereco.trim() + '.*', 'i') } : null;
  req.body.ordem ? query.ordem = req.body.ordem : null;

  if (req.body.externo != null && req.body.externo !== undefined) {
    query.externo = req.body.externo;
  }


  try {
    var menus = await MenuService.getMenus(query, page, limit, sort);
    return res.status(200).json(menus);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao filtrar os registros: ' + e });
  }
}

exports.getAllMenus = async function (req, res, next) {
  try {
    var menus = await MenuService.getAllMenus();
    return res.status(200).json(menus);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar os registros: ' + e });
  }
}

exports.getMenu = async function (req, res, next) {
  try {
    var menus = await MenuService.getMenu(req.params.id);
    return res.status(200).json(menus);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao buscar o registro: ' + e });
  }
}

exports.createMenu = async function (req, res, next) {

  let submenus = null;
  if (req.body.submenus) {
    for (let i = 0; i < req.body.submenus.length; i++) {
      if (req.body.submenus[i]._id.startsWith('___')) {
        delete req.body.submenus[i]._id;
      }
    }
    submenus = req.body.submenus;
  }

  var menu = {
    label: req.body.label,
    externo: req.body.externo,
    endereco: req.body.endereco,
    ordem: req.body.ordem,
    submenus: submenus,
    usuario: req.user.sub
  };

  try {
    var createdMenu = await MenuService.createMenu(menu, req.user.sub);
    return res.status(201).json(createdMenu);
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar realizar o cadastro: ' + e });
  }
}

exports.updateMenu = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: 'Id do registro não encontrado: ' + e });
  }

  let submenus = null;
  if (req.body.submenus) {
    for (let i = 0; i < req.body.submenus.length; i++) {
      if (req.body.submenus[i]._id.startsWith('___')) {
        delete req.body.submenus[i]._id;
      }
    }
    submenus = req.body.submenus;
  }

  var id = req.body._id;
  var menu = {
    id,
    label: req.body.label ? req.body.label : null,
    externo: req.body.externo,
    endereco: req.body.endereco ? req.body.endereco : null,
    ordem: req.body.ordem ? req.body.ordem : null,
    submenus: submenus
  };

  try {
    var updatedMenu = await MenuService.updateMenu(menu, req.user.sub);
    return res.status(200).json({ status: 200, data: updatedMenu, message: 'Registro atualizado com sucesso.' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar salvar o registro: ' + e });
  }
}

exports.removeMenu = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await MenuService.deleteMenu(id);
    return res.status(204).json({ status: 204, message: 'Registro removido com sucesso!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao tentar remover o registro: ' + e });
  }
}
