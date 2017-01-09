import { dispatch } from '../lib/dispatch';
import { setPost } from '../actions';
import Post from '../models/Post';
import  View from '../lib/view';

export default class NewView extends View {
  get template(){ return require("../templates/form.ejs") }

  private post: Post;
  initialize(options){
    this.post = options.post;
    //this.listenTo(this.model, "change", this.mapToTemplate);
  }

  changeValue(e: any){
    dispatch(setPost(super.changeValue(e)));
  }

  mapToTemplate(){
    this.post.observable.subscribe((data)=>{
      this.bindValue(data);
    });
  }

  render(){
    $(this.el).html(this.template());
    this.mapToTemplate();
    return this;
  }
}
