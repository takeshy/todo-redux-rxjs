import PostView from "./PostView";
import { fromEvent } from "rxjs/observable/fromEvent";
import { Subscription } from "rxjs/subscription";
import "rxjs/add/operator/filter";
import { dispatch } from "../lib/dispatch";
import Post from "../models/Post";
import Posts from "../models/Posts";
import { navigateNewPost } from "../actions";
import View from "../lib/view";
export default class IndexView extends View {
  get template() { return require("../templates/index.ejs"); }

  private posts: Posts;
  private childViews: {[key: string]: View} = {};
  private handlers: Subscription[];

  initialize(options) {
    this.posts = options.posts;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, "click").
        filter((event: any) => (<any>event.target).matches(".newPost")).
        subscribe((event) => {
          event.preventDefault();
          event.stopPropagation();
          dispatch(navigateNewPost());
        })
    );
  }

  addAll(posts: Post[]) {
    this.$("tbody").html("");
    posts.forEach((post) => this.addOne(post));
  }

  addOne(post) {
    const view = new PostView({ post });
    this.$("tbody").append(view.render().el);
    this.childViews[post.id] = view;
  }

  removeOne(post) {
    this.childViews[post.id].remove();
    delete(this.childViews[post.id]);
  }

  remove() {
    for (let id of Object.keys(this.childViews)) {
      this.childViews[id].remove();
      delete(this.childViews[id]);
    }
    return super.remove();
  }

  render() {
    $(this.el).html(this.template());
    this.addAll(this.posts.subject$.value);
    this.posts.removes$.subscribe(this.removeOne.bind(this));
    return this;
  }
}
