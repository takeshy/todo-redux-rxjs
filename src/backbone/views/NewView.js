import $ from 'jquery';
import { dispatch } from '../../dispatch';
import { setRoute, setPost, createPost } from '../../redux/actions';
import  AppView from '../lib/AppView';
import  FormView from './FormView';

export default class NewView extends AppView {
  get template(){ return require("../../templates/new.ejs") }

  events(){ return {"click #createBtn" : "createPost"}; }

  createPost(e){
    e.preventDefault();
    e.stopPropagation();
    const id = new Date().getTime();
    dispatch(createPost(Object.assign(this.model.toJSON(), { id })));
    dispatch(setRoute(`/${id}`));
  }

  render(){
    $(this.el).html(this.template(this.model.toJSON()));
    const view = new FormView({ model: this.model });
    this.$('.form').html(view.render().el);
    return this;
  }
}
