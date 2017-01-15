import { dispatch } from '../lib/dispatch';
import { setRoute, setPost, createPost } from '../actions';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/subscription';
import Post from '../models/Post';
import  View from '../lib/view';
import  FormView from './formView';

export default class NewView extends View {
  get template(){ return require("../templates/new.ejs") }

  
  private post: Post;
  private childViews: {[key:string]: View} = {};
  private handlers:Subscription[];
  initialize(options){
    this.post = options.post;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, 'click').
        filter((event:any)=> (<any>event.target).matches('#createBtn')).
        subscribe((event)=>{
          event.preventDefault();
          event.stopPropagation();
          this.createPost();
        })
    );
  }

  remove(){
    for(let id of Object.keys(this.childViews)){
      this.childViews[id].remove();
      delete(this.childViews[id]);
    }
    return super.remove();
  }

  createPost(){
    const id = new Date().getTime();
    dispatch(createPost(Object.assign({}, this.post.observable.value, { id })));
    dispatch(setRoute(`/${id}`));
  }

  render(){
    $(this.el).html(this.template());
    const view = new FormView({ post: this.post });
    this.$('.form').append(view.render().el);
    this.childViews['form'] = view;
    return this;
  }
}
