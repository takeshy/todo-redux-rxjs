import Router from '../lib/router';
import IndexView from '../views/indexView';
import NewView from '../views/newView';
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
    //const view = new ShowView({ model: this.resources.posts.get(id) });
    //this.draw(view);
  }

  edit(id){
    //const view = new EditView({ model: this.resources.post });
    //this.draw(view);
  }
}
