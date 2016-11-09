var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/MEAN-msg-board')
module.exports = mongoose
