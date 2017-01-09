import PostView from './PostView';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/subscription';
import 'rxjs/add/operator/filter';
import { dispatch } from '../lib/dispatch';
import Post from '../models/post';
import Posts from '../models/posts';
import { navigateNewPost } from '../actions';
import View from '../lib/view';
export default class IndexView extends View {
  get template(){ return require("../templates/index.ejs") }

  private posts: Posts;
  private childViews: {[key:string]: View} = {};
  private handlers:Subscription[];

  initialize(options){
    this.posts = options.posts;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, 'click').
        filter((event:any)=> (<any>event.target).matches('.newPost')).
        subscribe((event)=>{
          event.preventDefault();
          event.stopPropagation();
          dispatch(navigateNewPost());
        })
    );
    //this.listenTo(this.collection,'remove', this.removeOne)
  }

  addAll(posts: Post[]){
    posts.forEach((post)=> this.addOne(post));
  }

  addOne(post){
    const view = new PostView({ post });
    this.$("tbody").append(view.render().el);
    this.childViews[post.id] = view;
  }

  removeOne(post){
    this.childViews[post.id].remove();
    delete(this.childViews[post.id]);
  }

  remove(){
    for(let id of Object.keys(this.childViews)){
      this.childViews[id].remove();
      delete(this.childViews[id]);
    }
    return super.remove();
  }

  render(){
    $(this.el).html(this.template());
    this.handlers.push(this.posts.observable.subscribe((posts)=>{
      this.addAll(posts);
    }));
    return this;
  }
}
