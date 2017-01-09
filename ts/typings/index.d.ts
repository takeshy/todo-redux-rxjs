/// <reference path="./state.d.ts" />
declare function require(x: string): any;
interface ObjectConstructor {
  entries<T>(o: { [s: string]: T }): [string, T][];
  entries(o: any): [string, any][];
  assign(...objects: Object[]): Object;
}
interface HTMLElement {
  type: string;
}
interface Window {
  $: JQuery;
  devToolsExtension: any;
  router: any;
}
