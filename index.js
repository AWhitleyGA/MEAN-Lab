var express = require('express')
var parser = require('body-parser')
var hbs = require('hbs')
var mongoose = require('./db/models.js')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

var app = express()

app.set('port', process.env.PORT || 3000)
app.set("view engine", "hbs")
app.use("/assets", express.static("public"))
app.use(parser.json({extended: true}))

app.get('/', (req, res) => {
  res.render("index")
})

app.get('/posts', (req, res) => {
  Post.find({}).then((posts) => {
    res.json(posts)
  })
})

app.get('/posts/:id', (req, res) => {
  Post.findOne({_id: req.params.id}).then((post) => {
    res.json(post)
  })
})

app.put('/posts/:id', (req, res) => {
  Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then((post) => {
    res.json(post)
  })
})

app.post('/posts', (req, res) => {
  Post.create(req.body).then((post) => {
    res.json(post)
  })
})

app.listen(app.get('port'), function() {
  console.log('Working!')
})
