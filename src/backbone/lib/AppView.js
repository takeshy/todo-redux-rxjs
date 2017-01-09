import $ from 'jquery';
export default class AppView extends Backbone.View {

  changeEvent() {
    return {"change [data-type]": "changeValue"};
  }

  changeValue(e) {
    const $currentTarget = $(e.currentTarget);
    const type = $currentTarget.data('type');
    switch(type){
    case 'string':
      return { [$currentTarget.attr("name")]: $currentTarget.val() };
    case 'number':
      return { [$currentTarget.attr("name")]: parseInt($currentTarget.val()) };
    }
  }

  bindValue(attributes){
    Object.keys(attributes).forEach((member) => {
      let $field = this.$(`[name=${member}]`);
      if($field.length == 0){ $field = this.$(`[data-name=${member}]`); }
      if($field.length == 0){ return; }
      const value = attributes[member];
      const node = $field[0].nodeName;
      if(node == 'INPUT'){
        if(['radio', 'checkbox'].indexOf($field[0].type) !== -1){
          this.$(`[name=${member}][value=${attributes[member]}]`).prop('checked', !!value);
        } else {
          $field.val(value);
        }
      } else {
        $field.text(value);
      }
    });
  }
}
