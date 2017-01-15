import { dispatch } from '../lib/dispatch';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/subscription';
import { setPost } from '../actions';
import Post from '../models/Post';
import  View from '../lib/view';

export default class NewView extends View {
  get template(){ return require("../templates/form.ejs") }

  private post: Post;
  private handlers:Subscription[];
  initialize(options){
    this.post = options.post;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, 'change').
        subscribe((event: any)=>{
          event.preventDefault();
          event.stopPropagation();
          this.changeValue(event);
        })
    );
  }

  changeValue(e: any){
    dispatch(setPost(super.changeValue(e)));
  }

  mapToTemplate(){
    this.handlers.push(
      this.post.observable.subscribe((data)=>{
        this.bindValue(data);
      })
    );
  }

  render(){
    $(this.el).html(this.template());
    this.mapToTemplate();
    return this;
  }
}
