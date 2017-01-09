import PostView from './PostView';
import $ from 'jquery';
import { dispatch } from '../../dispatch';
import { navigateNewPost } from '../../redux/actions';
import  AppView from '../lib/AppView';
export default class IndexView extends AppView {
  get template(){ return require("../../templates/index.ejs") }

  events(){ return { "click .newPost": "navigateNew"}; }

  initialize(){
    this.childViews = [];
    this.listenTo(this.collection,'remove', this.removeOne)
  }

  addAll(){
    this.collection.each((post)=> this.addOne(post));
  }

  addOne(post){
    const view = new PostView({model : post});
    this.$("tbody").append(view.render().el);
    this.childViews.push(view)
  }

  removeOne(post){
    const idx = this.childViews.findIndex((view)=> view.model.id == post.id);
    const views = this.childViews.splice(idx, 1);
    views.forEach((view)=> view.remove());
  }

  navigateNew(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(navigateNewPost());
  }

  remove(){
    this.childViews.forEach((view)=> view.remove());
    super.remove();
  }

  render(){
    $(this.el).html(this.template());
    this.addAll();
    return this;
  }
}
