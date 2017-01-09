import { dispatch } from '../lib/dispatch';
import { setRoute, setPost, createPost } from '../actions';
import Post from '../models/Post';
import  View from '../lib/view';
import  FormView from './formView';

export default class NewView extends View {
  get template(){ return require("../templates/new.ejs") }

  
  private post: Post;
  initialize(options){
    this.post = options.post;
  }

  createPost(e){
    e.preventDefault();
    e.stopPropagation();
    const id = new Date().getTime();
    dispatch(createPost(Object.assign(this.post, { id })));
    dispatch(setRoute(`/${id}`));
  }

  render(){
    $(this.el).html(this.template(this.post));
    const view = new FormView({ post: this.post });
    this.$('.form').append(view.render().el);
    return this;
  }
}
