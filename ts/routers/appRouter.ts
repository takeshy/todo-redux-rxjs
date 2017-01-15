import Router from '../lib/router';
import IndexView from '../views/indexView';
import NewView from '../views/newView';
import ShowView from '../views/showView';
import EditView from '../views/editView';
export default class AppRouter extends Router {
  get routes(){
    return {
      "new"      : "newPost",
      ":id/edit" : "edit",
      ":id"      : "show",
      ""         : "index"
    }
  }

  draw(view){
    if(this.view){ this.view.remove(); }
    this.view = view;
    this.$elem.html(view.render().el);
  }

  index(){
    const view = new IndexView({ posts: this.resources.posts });
    this.draw(view);
  }

  newPost(){
    const view = new NewView({ post: this.resources.post });
    this.draw(view);
  }

  show(id){
    const view = new ShowView({ post: this.resources.posts.observable.value.filter((post)=> post.id === parseInt(id))[0] });
    this.draw(view);
  }

  edit(id){
    const view = new EditView({ post: this.resources.post });
    this.draw(view);
  }
}
