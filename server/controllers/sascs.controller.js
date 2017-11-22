// Accessing the Service that we just created

var SascService = require('../services/sascs.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getSascs = async function (req, res, next) {

  // Check the existence of the query parameters, If the exists doesn't exists assign a default value

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10;

  try {

    var sascs = await SascService.getSascs({}, page, limit)

    // Return the sascs list with the appropriate HTTP Status Code and Message.

    return res.status(200).json({ status: 200, data: sascs, message: "Succesfully Sascs Recieved" });

  } catch (e) {

    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({ status: 400, message: e.message });

  }
}

exports.createSasc = async function (req, res, next) {

  // Req.Body contains the form submit values.

  var sasc = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  }

  try {

    // Calling the Service function with the new object from the Request Body

    var createdSasc = await SascService.createSasc(sasc)
    return res.status(201).json({ status: 201, data: createdSasc, message: "Succesfully Created Sasc" })
  } catch (e) {

    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({ status: 400, message: "Sasc Creation was Unsuccesfull" })
  }
}

exports.updateSasc = async function (req, res, next) {

  // Id is necessary for the update

  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "Id must be present" })
  }

  var id = req.body._id;

  console.log(req.body)

  var sasc = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  }

  try {
    var updatedSasc = await SascService.updateSasc(sasc)
    return res.status(200).json({ status: 200, data: updatedSasc, message: "Succesfully Updated Tod" })
  } catch (e) {
    return res.status(400).json({ status: 400., message: e.message })
  }
}

exports.removeSasc = async function (req, res, next) {

  var id = req.params.id;

  try {
    var deleted = await SascService.deleteSasc(id)
    return res.status(204).json({ status: 204, message: "Succesfully Sasc Deleted" })
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }

}