export class Post extends Backbone.Model{} 
export class PostsCollection extends Backbone.Collection {
  get model(){ return Post }
}
