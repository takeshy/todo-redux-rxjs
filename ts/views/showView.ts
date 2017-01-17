import  View from "../lib/view";
import Post from "../models/Post";
import { Subscription } from "rxjs/subscription";
export default class ShowView extends View {
  get template(){ return require("..//templates/show.ejs"); }

  private post: Post;
  private handlers: Subscription[];

  initialize(options) {
    this.post = options.post;
    this.handlers = [];
  }

  mapToTemplate(value) {
    this.bindValue(value);
  }

  render() {
    this.$el.html(this.template());
    this.mapToTemplate(this.post.subject$.value);
    this.handlers.push(
      this.post.changes$
        .switchMap(() => this.post.subject$)
        .subscribe((value) => this.mapToTemplate(value))
    );
    return this;
  }
}
