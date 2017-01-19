import { dispatch } from "../lib/dispatch";
import { setRoute,  updatePost } from "../actions";
import { fromEvent } from "rxjs/observable/fromEvent";
import  View from "../lib/view";
import Post from "../models/Post";
import { Subscription } from "rxjs/subscription";
import  FormView from "./formView";

export default class EditView extends View {
  get template(){ return require("../templates/edit.ejs"); }

  private post: Post;
  private childViews: {[key: string]: View} = {};
  private handlers: Subscription[];
  initialize(options) {
    this.post = options.post;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, "click")
        .filter((event: any) => (<any>event.target).matches("#updateBtn"))
        .do((e) => {
          e.preventDefault();
          e.stopPropagation();
        })
        .map(() => this.post.subject$.value)
        .subscribe((value) => {
          dispatch(updatePost(value));
          dispatch(setRoute(`/`));
        })
    );
  }

  render() {
    this.$el.html(this.template());
    const view = new FormView({ post: this.post });
    this.$(".form").append(view.render().el);
    this.childViews["form"] = view;
    return this;
  }
}
