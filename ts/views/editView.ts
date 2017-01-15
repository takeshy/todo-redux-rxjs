import { dispatch } from '../lib/dispatch';
import { setRoute,  updatePost } from '../actions';
import { fromEvent } from 'rxjs/observable/fromEvent';
import  View from '../lib/view';
import Post from '../models/Post';
import { Subscription } from 'rxjs/subscription';
import  FormView from './formView';

export default class EditView extends View {
  get template(){ return require("../templates/edit.ejs"); }

  private post: Post;
  private childViews: {[key:string]: View} = {};
  private handlers:Subscription[];
  initialize(options){
    this.post = options.post;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, 'click').
        filter((event:any)=> (<any>event.target).matches('#updateBtn')).
        subscribe((event)=>{
          event.preventDefault();
          event.stopPropagation();
          this.update(event);
        })
    );
  }

  update(e){
    console.log(Object.assign({}, this.post.observable.value));
    dispatch(updatePost(Object.assign({}, this.post.observable.value)));
    dispatch(setRoute(`/`));
  }

  render(){
    this.$el.html(this.template());
    const view = new FormView({ post: this.post });
    this.$('.form').append(view.render().el);
    this.childViews['form'] = view;
    return this;
  }
}
