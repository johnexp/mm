// Gettign the Newly created Mongoose Model we just created 
var Sasc = require('../models/sasc.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getSascs = async function (query, page, limit) {

  // Options setup for the mongoose paginate
  var options = {
    page,
    limit
  }

  // Try Catch the awaited promise to handle the error 

  try {
    var sascs = await Sasc.paginate(query, options)

    // Return the sascd list that was retured by the mongoose promise
    return sascs;

  } catch (e) {

    // return a Error message describing the reason 
    throw Error('Error while Paginating Sascs')
  }
}

exports.createSasc = async function (sasc) {

  // Creating a new Mongoose Object by using the new keyword
  var newSasc = new Sasc({
    title: sasc.title,
    description: sasc.description,
    date: new Date(),
    status: sasc.status
  })

  try {

    // Saving the Sasc 
    var savedSasc = await newSasc.save()

    return savedSasc;
  } catch (e) {

    // return a Error message describing the reason     
    throw Error("Error while Creating Sasc")
  }
}

exports.updateSasc = async function (sasc) {
  var id = sasc.id

  try {
    //Find the old Sasc Object by the Id

    var oldSasc = await Sasc.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Sasc")
  }

  // If no old Sasc Object exists return false
  if (!oldSasc) {
    return false;
  }

  console.log(oldSasc)

  //Edit the Sasc Object
  oldSasc.title = sasc.title
  oldSasc.description = sasc.description
  oldSasc.status = sasc.status


  console.log(oldSasc)

  try {
    var savedSasc = await oldSasc.save()
    return savedSasc;
  } catch (e) {
    throw Error("And Error occured while updating the Sasc");
  }
}

exports.deleteSasc = async function (id) {

  // Delete the Sasc
  try {
    var deleted = await Sasc.remove({ _id: id })
    if (deleted.result.n === 0) {
      throw Error("Sasc Could not be deleted")
    }
    return deleted
  } catch (e) {
    throw Error("Error Occured while Deleting the Sasc")
  }
}