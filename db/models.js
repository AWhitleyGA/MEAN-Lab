var mongoose = require('./connection.js')


var CommentSchema = mongoose.Schema({
  body: String,
  author: String,
},
{
  timestamps: true,
})

var PostSchema = mongoose.Schema({
  title: String,
  body: String,
  author: String,
  comments: [CommentSchema],
},
{
  timestamps: true,
})

var Comment = mongoose.model("Comment", CommentSchema)
var Post = mongoose.model("Post", PostSchema)

module.exports = mongoose
