import { dispatch } from '../../dispatch';
import { deletePost, editPost, navigateEditPost, setRoute } from '../../redux/actions';
import  AppView from '../lib/AppView';
export default class PostView extends AppView{
  get template(){ return require("../../templates/post.ejs") }
  get events(){
    return {
    "click .editPost" : "edit",
    "click .destroyPost" : "destroy",
    "click .showPost" : "show"
    };
  }
  get tagName(){ return "tr"; }

  initialize(){
    this.listenTo(this.model,'destroy', this.remove)
    this.listenTo(this.model,'change', this.render)
  }

  destroy(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePost(this.model.id));
  }

  edit(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(navigateEditPost(this.model.id));
  }

  show(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(setRoute(`/${this.model.id}`));
  }

  render(){
    this.$el.html(this.template());
    this.bindValue(this.model.toJSON());
    return this;
  }
}
