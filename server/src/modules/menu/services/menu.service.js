const Menu = require('../models/menu.model'),
  _this = this;

exports.getMenus = async function (query, page, limit, sort) {
  // Options setup for the mongoose paginate
  var options = {
    sort,
    page,
    limit,
    populate: [{
      path: 'user',
      select: 'firstName'
    }, {
      path: 'submenus'
    }]
  };

  try {
    var menus = await Menu.paginate(query, options);
    return menus;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getAllMenus = async function () {
  try {
    var menus = await Menu
      .find()
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'submenus'
      }]);
    return menus;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.getMenu = async function (id) {
  try {
    var menu = await Menu
      .findById(id)
      .populate([{
        path: 'user',
        select: 'firstName'
      }, {
        path: 'submenus'
      }]);
    return menu;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createMenu = async function (menu, user) {
  // Creating a new Mongoose Object by using the new keyword
  var newMenu = new Menu({
    nome: menu.nome,
    label: menu.label,
    externo: menu.externo,
    endereco: menu.endereco,
    ordem: menu.ordem,
    usuario: menu.usuario,
    submenus: menu.submenus
  });

  try {
    let listaMenusPosteriores = await Menu.find({ ordem: { $gte: newMenu.ordem } });
    var savedMenu = await newMenu.save();
    listaMenusPosteriores.forEach(function (menu) {
      menu.ordem++;
      menu.save();
    });
    this.createHistory(savedMenu.id, savedMenu, 'C', user);
    return savedMenu;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateMenu = async function (menu, user) {
  var id = menu.id;

  try {
    var oldMenu = await Menu.findById(id);
  } catch (e) {
    throw Error(e.message);
  }

  if (!oldMenu) {
    return false;
  }

  let ordemAntiga = oldMenu.ordem;

  oldMenu.nome = menu.nome;
  oldMenu.label = menu.label;
  oldMenu.externo = menu.externo;
  oldMenu.endereco = menu.endereco;
  oldMenu.ordem = menu.ordem;
  oldMenu.submenus = menu.submenus;

  try {
    let listaMenusAlterados = [];
    if (ordemAntiga !== menu.ordem) {
      if (ordemAntiga > menu.ordem) {
        listaMenusAlterados = await Menu.find({ ordem: { $gte: menu.ordem, $lt: ordemAntiga } });
      } else {
        listaMenusAlterados = await Menu.find({ ordem: { $lte: menu.ordem, $gt: ordemAntiga } });
      }
    }

    var savedMenu = await oldMenu.save();

    if (ordemAntiga !== menu.ordem) {
      if (ordemAntiga > menu.ordem) {
        // aumentar ordens maiores que ordemAntiga e menores ou igual que nova ordem
        listaMenusAlterados.forEach(function (menu) {
          menu.ordem++;
          menu.save();
        });
      } else {
        // diminuir ordens menores que ordemAntiga e maiores ou igual que nova ordem
        listaMenusAlterados.forEach(function (menu) {
          menu.ordem--;
          menu.save();
        });
      }
    }

    this.createHistory(id, savedMenu, 'U', user);
    return savedMenu;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteMenu = async function (id) {
  try {
    var deleted = await Menu.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Menu Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.createHistory = async function (id, obj, acao, user) {
  try {
    var menu = await Menu.findById(id).select('historico');
    obj.historico = undefined;
    menu.historico.push({ 'data': Date.now(), 'usuario': user, 'acao': acao, 'objeto': JSON.stringify(obj) });
    await menu.save();
  } catch (e) {
    throw Error(e.message);
  }
}
