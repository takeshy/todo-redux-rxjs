import $ from 'jquery';
import Backbone from 'backbone';
import IndexView from '../views/IndexView';
import NewView from '../views/NewView';
import EditView from '../views/EditView';
import ShowView from '../views/ShowView';
import { dispatch } from '../../dispatch';
import { setRoute } from '../../redux/actions';
import { PostsCollection, Post } from '../models/Post';

export default class AppRouter extends Backbone.Router {
  get routes(){
    return {
      "new"      : "newPost",
      ":id/edit" : "edit",
      ":id"      : "show",
      ""         : "index"
    }
  }

  initialize(options){
    this.resources = options.resources;
    this.$elem = options.$elem;
    this.on("route", (obj) => {
      if(this.resources.route.get("path") != `/${Backbone.history.fragment}`){
        dispatch(setRoute(`/${Backbone.history.fragment}`));
      }
    });
    this.resources.route.on("change:path", (obj) => { this.navigate(obj.get('path'),{ trigger: true }) });
  }

  draw(view){
    if(this.view){ this.view.remove(); }
    this.view = view;
    this.$elem.html(view.render().el);
  }

  index(){
    const view = new IndexView({ collection: this.resources.posts });
    this.draw(view);
  }

  newPost(){
    const view = new NewView({ model: this.resources.post });
    this.draw(view);
  }

  show(id){
    const view = new ShowView({ model: this.resources.posts.get(id) });
    this.draw(view);
  }

  edit(id){
    const view = new EditView({ model: this.resources.post });
    this.draw(view);
  }
}
