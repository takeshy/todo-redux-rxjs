import { dispatch } from '../lib/dispatch';
import Post from '../models/Post';
import { deletePost, navigateEditPost, setRoute } from '../actions';
import  View from '../lib/view';
export default class PostView extends View{
  get template(){ return require("../templates/post.ejs") }
  get events(){
    return {
    "click .editPost" : "edit",
    "click .destroyPost" : "destroy",
    "click .showPost" : "show"
    };
  }

  private post: Post;
  protected tagName = 'tr';
  initialize(options){
    this.post = options.post;
    //this.listenTo(this.model,'destroy', this.remove)
    //this.listenTo(this.model,'change', this.render)
  }

  destroy(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePost(this.post.id));
  }

  edit(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(navigateEditPost(this.post.id));
  }

  show(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(setRoute(`/${this.post.id}`));
  }

  render(){
    this.$el.html(this.template());
    this.post.observable.subscribe((data)=>{
      this.bindValue(data);
    });
    return this;
  }
}
