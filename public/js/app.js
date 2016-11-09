angular
  .module("MeanApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("PostFactory", [
    "$resource",
    PostFactoryFunction
  ])
  .controller("PostIndexController", [
    "PostFactory",
    "$state",
    PostIndexControllerFunction
  ])
  .controller("PostShowController", [
    "PostFactory",
    "$stateParams",
    PostShowControllerFunction
  ])


  function PostFactoryFunction($resource) {
    return $resource("http://localhost:3000/posts/:id", {}, {
      update: {method: "PUT"}
    })
  }

  function PostIndexControllerFunction(PostFactory, $state) {
    this.posts = PostFactory.query()
    this.newPost = new PostFactory()
    this.create = function() {
      this.newPost.$save().then((post) => {
        $state.go("postShow", {id: post._id})
      })
    }
  }

  function PostShowControllerFunction(PostFactory, $stateParams) {
    this.post = PostFactory.get({id: $stateParams.id})
    this.newComment = {}
    this.update = () => {
      console.log(this.post)
      this.post.comments.push(this.newComment)
      this.post.$update({id: $stateParams.id})
    }
  }


  function RouterFunction($stateProvider) {
    $stateProvider
    .state("postIndex", {
      url: "/",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "PostIndexController",
      controllerAs: "vm"
    })
    .state("postShow", {
      url: "/:id",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "PostShowController",
      controllerAs: "vm"
    })
  }
