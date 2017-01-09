import $ from 'jquery';
import { dispatch } from '../../dispatch';
import { setRoute, setPost, updatePost } from '../../redux/actions';
import  AppView from '../lib/AppView';
import  FormView from './FormView';

export default class EditView extends AppView {
  get template(){ return require("../../templates/edit.ejs"); }

  events(){ return {"click #updateBtn" : "update"}; }

  update(e){
    e.preventDefault();
    e.stopPropagation();
    dispatch(updatePost(this.model.toJSON()));
    dispatch(setRoute(`/${this.model.id}`));
  }

  render(){
    this.$el.html(this.template());
    const view = new FormView({ model: this.model });
    this.$('.form').html(view.render().el);
    return this;
  }
}
