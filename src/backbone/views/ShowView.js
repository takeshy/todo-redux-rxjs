import  AppView from '../lib/AppView';
export default class ShowView extends AppView{
  get template(){ return require("../../templates/show.ejs"); }

  render(){
    this.$el.html(this.template());
    this.bindValue(this.model.toJSON());
    return this;
  }
}
