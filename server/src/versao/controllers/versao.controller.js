// Accessing the Service that we just created
var VersaoService = require('../services/versao.service');

// Saving the context of this module inside the _the variable
_this = this;


// Async Controller function to get the Versoes List
exports.getVersoes = async function (req, res, next) {

  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  var page = req.query.page ? +req.query.page : 1;
  var limit = req.query.limit ? +req.query.limit : 10;
  var order = req.query.order ? req.query.order == 'asc' ? 1 : -1 : 1;
  var sortBy = req.query.sort ? req.query.sort : 'id';
  var sort = JSON.parse('{ "' + sortBy + '": ' + order + ' }');

  var query = {};
  req.body.descricao ? query.descricao = { $regex: new RegExp('^.*' + req.body.descricao.trim() + '.*', 'i') } : null;
  req.body.numeroVersao ? query.numeroVersao = { $regex: new RegExp('^.*' + req.body.numeroVersao.trim() + '.*', 'i') } : null;
  req.body.dataPublicacao ? query.dataPublicacao = req.body.dataPublicacao : null;
  req.body.dataRelease ? query.dataRelease = req.body.dataRelease : null;

  try {
    var versoes = await VersaoService.getVersoes(query, page, limit, sort);

    // Return the versoes list with the appropriate HTTP Status Code and Message.
    return res.status(200).json(versoes);
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

// Async Controller function to get the Versoes List
exports.getAllVersoes = async function (req, res, next) {
  try {
    var versoes = await VersaoService.getAllVersoes();

    // Return the versoes list with the appropriate HTTP Status Code and Message.
    return res.status(200).json(versoes);
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

// Async Controller function to get the Versoes List
exports.getVersao = async function (req, res, next) {
  try {
    var versoes = await VersaoService.getVersao(req.params.id)
    // Return the versoes list with the appropriate HTTP Status Code and Message.
    return res.status(200).json(versoes);
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.createVersao = async function (req, res, next) {
  var tickets = null;
  if (req.body.tickets) {
    for (var i = 0; i < req.body.tickets.length; i++) {
      if (req.body.tickets[i]._id.startsWith('___')) {
        delete req.body.tickets[i]._id;
      }
    }
    tickets = req.body.tickets;
  }

  var versao = {
    numeroVersao: req.body.numeroVersao,
    descricao: req.body.descricao,
    dataPublicacao: req.body.dataPublicacao,
    dataRelease: req.body.dataRelease,
    tickets: tickets
  };

  try {
    // Calling the Service function with the new object from the Request Body
    var createdVersao = await VersaoService.createVersao(versao);
    return res.status(201).json(createdVersao);
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: "Versao Creation was Unsuccesfull" });
  }
}

exports.updateVersao = async function (req, res, next) {
  console.log('put');
  // Id is necessary for the update
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" });
  }

  var id = req.body._id;
  var tickets = null;
  if (req.body.tickets) {
    for (var i = 0; i < req.body.tickets.length; i++) {
      if (req.body.tickets[i]._id.startsWith('___')) {
        delete req.body.tickets[i]._id;
      }
    }
    tickets = req.body.tickets;
  }
  var sasc = {
    id,
    numeroVersao: req.body.numeroVersao ? req.body.numeroVersao : null,
    descricao: req.body.descricao ? req.body.descricao : null,
    dataPublicacao: req.body.dataPublicacao ? req.body.dataPublicacao : null,
    dataRelease: req.body.dataRelease ? req.body.dataRelease : null,
    tickets: tickets
  };

  try {
    var updatedVersao = await VersaoService.updateVersao(sasc);
    return res.status(200).json({ status: 200, data: updatedVersao, message: "Succesfully Updated Tod" });
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message });
  }
}

exports.removeVersao = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await VersaoService.deleteVersao(id);
    return res.status(204).json({ status: 204, message: "Succesfully Versao Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}