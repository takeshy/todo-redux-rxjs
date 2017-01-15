import { dispatch } from "../lib/dispatch";
import { fromEvent } from "rxjs/observable/fromEvent";
import { Subscription } from "rxjs/subscription";
import { setPost } from "../actions";
import Post from "../models/Post";
import  View from "../lib/view";

export default class FormView extends View {
  get template() { return require("../templates/form.ejs"); }

  private post: Post;
  private handlers: Subscription[];
  initialize(options) {
    this.post = options.post;
    this.handlers = [];
    this.handlers.push(
      fromEvent(this.el, "change").
        subscribe((event: any) => {
          event.preventDefault();
          event.stopPropagation();
          this.changeValue(event);
        })
    );
  }

  changeValue(e: any) {
    dispatch(setPost(super.changeValue(e)));
  }

  mapToTemplate(data) {
    this.bindValue(data);
  }

  render() {
    $(this.el).html(this.template());
    this.handlers.push(
      this.post.observable.subscribe(({ value, changed }) => {
        this.mapToTemplate(value);
      })
    );
    return this;
  }
}
