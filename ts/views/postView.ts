import { dispatch } from "../lib/dispatch";
import { fromEvent } from "rxjs/observable/fromEvent";
import { Subscription } from "rxjs/subscription";
import Post from "../models/Post";
import { deletePost, navigateEditPost, setRoute } from "../actions";
import  View from "../lib/view";
export default class PostView extends View {
  get template(){ return require("../templates/post.ejs"); }

  private post: Post;
  protected tagName = "tr";
  private handlers: Subscription[];
  initialize(options) {
    this.post = options.post;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, "click").
        subscribe((event: any) => {
          event.preventDefault();
          event.stopPropagation();
          if ($(event.target).hasClass("showPost")) {
            this.show();
          } else if ($(event.target).hasClass("editPost")) {
            this.edit();
          } else if ($(event.target).hasClass("destroyPost")) {
            this.destroy();
          }
        })
    );
  }

  destroy() {
    dispatch(deletePost(this.post.id));
    dispatch(setRoute(`/`));
  }

  edit() {
    dispatch(navigateEditPost(this.post.id));
  }

  show() {
    dispatch(setRoute(`/${this.post.id}`));
  }

  render() {
    this.$el.html(this.template());
    this.post.subject$.subscribe((value) => {
      this.bindValue(value);
    });
    return this;
  }
}
