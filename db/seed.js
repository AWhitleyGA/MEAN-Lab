var mongoose = require('./models')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

var posts = [
  {
    title: "First Post",
    author: "John Doe",
    body: "Mary had a little lamb",
  },
  {
    title: "Second Post",
    author: "Jane Doe",
    body: "The wheels on the bus go round and round",
  }
]

var comments = [
  {
    body: "That first post was dope",
    author: "Steve Jones",
  },
  {
    body: "I like the second Post",
    author: "Hillary Clinton",
  }
]

Post.remove({}).then(() => {
  posts.forEach((post) => {
    newPost = new Post(post)
    comments.forEach((comment) => {
      newPost.comments.push(comment)
    })
    newPost.save().then((post) => {
      console.log(post)
    }).catch((err) => {
      console.log(err)
    })
  })
})
