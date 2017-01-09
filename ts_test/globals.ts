interface Global {
  $: any;
  _: any;
}
declare var global: Global;

const setGlobal = ()=> {
  global.$ = require("jquery");
  global._ = require("underscore");
};
export default setGlobal();
