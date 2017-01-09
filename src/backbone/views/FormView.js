import $ from 'jquery';
import { dispatch } from '../../dispatch';
import { setPost } from '../../redux/actions';
import  AppView from '../lib/AppView';

export default class NewView extends AppView {
  get template(){ return require("../../templates/form.ejs") }

  events(){
    return this.changeEvent();
  }

  initialize(){
    this.listenTo(this.model, "change", this.mapToTemplate);
  }

  changeValue(e){
    dispatch(setPost(super.changeValue(e)));
  }

  mapToTemplate(){
    this.bindValue(this.model.toJSON());
  }

  render(){
    $(this.el).html(this.template());
    this.mapToTemplate();
    return this;
  }
}
