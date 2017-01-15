export default class View {
  // The default `tagName` of a View's element is `"div"`.
  protected tagName = 'div';
  protected $el: JQuery;
  public    el: HTMLElement;
  protected id: string;
  protected className: string;
  private _listens:(()=>void)[] = [];
  private eventNames = new Set<string>();
  get events(){ return {} };
  constructor(options){
    if(options.el){ this.el = options.el; }
    this._ensureElement();
    this.initialize.apply(this, arguments);
  }

  initialize(options){}

  // jQuery delegate for element lookup, scoped to DOM elements within the
  // current view. This should be preferred to global lookups where possible.
  $(selector) {
    return this.$el.find(selector);
  }

  // **render** is the core function that your view should override, in order
  // to populate its element (`this.el`), with the appropriate HTML. The
  // convention is for **render** to always return `this`.
  render() {
    return this;
  }

  // Remove this view by taking the element out of the DOM, and removing any
  // applicable Backbone.Events listeners.
  remove() {
    this._removeElement();
    return this;
  }
  // Remove this view's element from the document and all event listeners
  // attached to it. Exposed for subclasses using an alternative DOM
  // manipulation API.
  _removeElement() {
    this.$el.remove();
  }
  // Change the view's element (`this.el` property) and re-delegate the
  // view's events on the new element.
  setElement(element) {
    this._setElement(element);
    return this;
  }

  // Creates the `this.el` and `this.$el` references for this view using the
  // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
  // context or an element. Subclasses can override this to utilize an
  // alternative DOM manipulation API and are only required to set the
  // `this.el` property.
  _setElement(el) {
    this.$el = $(el);
    this.el = this.$el[0];
  }


  // Produces a DOM element to be assigned to your view. Exposed for
  // subclasses using an alternative DOM manipulation API.
  _createElement(tagName) {
    return document.createElement(tagName);
  }

  // Ensure that the View has a DOM element to render into.
  // If `this.el` is a string, pass it through `$()`, take the first
  // matching element, and re-assign it to `el`. Otherwise, create
  // an element from the `id`, `className` and `tagName` properties.
  _ensureElement(){
    if (!this.el) {
      const attrs = {};
      if (this.id) attrs['id'] = this.id;
      if (this.className) attrs['class'] = this.className;
      this.setElement(this._createElement(this.tagName));
      this._setAttributes(attrs);
    } else {
      this.setElement(_.result(this, 'el'));
    }
  }

  // Set attributes from a hash on this view's element.  Exposed for
  // subclasses using an alternative DOM manipulation API.
  _setAttributes(attributes) {
    this.$el.attr(attributes);
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

  changeEvent() {
    return {"change [data-type]": "changeValue"};
  }

  changeValue(e: any): any {
    const $currentTarget = $(e.target);
    const type = $currentTarget.data('type');
    switch(type){
    case 'string':
      return { [$currentTarget.attr("name")]: $currentTarget.val() };
    case 'number':
      return { [$currentTarget.attr("name")]: parseInt($currentTarget.val()) };
    }
  }
}
