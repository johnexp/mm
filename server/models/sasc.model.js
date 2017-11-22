var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var SascSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: String
})

SascSchema.plugin(mongoosePaginate)
const Sasc = mongoose.model('Sasc', SascSchema)

module.exports = Sasc;