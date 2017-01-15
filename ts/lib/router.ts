import { IResources } from './mapStateToObserver'
interface IHandlers {
  route: RegExp;
  callback:(string)=>void;
}
export default class Router {
  private root:string;
  private routeStripper = /^[#\/]|\s+$/g;
  private handlers:IHandlers[] = [];
  private fragment:string;
  protected view:any;
  protected routes:{[key:string]: string;};
  protected $elem:JQuery;
  protected resources: IResources;
  private optionalParam = /\((.*?)\)/g;
  private namedParam    = /(\(\?)?:\w+/g;
  private splatParam    = /\*\w+/g;
  private escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  constructor(resources: IResources, $elem: JQuery, root: string = '/', ){
    this.handlers = [];
    this.root = root;
    this.$elem = $elem;
    this.resources = resources;
    this.fragment = this.getFragment();
    this._bindRoutes();
    this.resources.route.observable.subscribe((route)=>{
      history.pushState(null,null,route.path);
      this.checkUrl();
    });
    this.initialize.apply(this, arguments);
    this.loadUrl()
  }
  initialize(){}
  // Bind all defined routes to `Backbone.history`. We have to reverse the
  // order of the routes here to support behavior where the most general
  // routes can be defined at the bottom of the route map.
  _bindRoutes() {
    const routes = Object.keys(this.routes);
    let route;
    while ((route = routes.pop()) != null) {
      this.route(route, this.routes[route]);
    }
  }
  // Convert a route string into a regular expression, suitable for matching
  // against the current location hash.
  _routeToRegExp(route) {
    route = route.replace(this.escapeRegExp, '\\$&')
                 .replace(this.optionalParam, '(?:$1)?')
                 .replace(this.namedParam, function(match, optional) {
                   return optional ? match : '([^/?]+)';
                 })
                 .replace(this.splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
  }
  // Given a route, and a URL fragment that it matches, return the array of
  // extracted decoded parameters. Empty or unmatched parameters will be
  // treated as `null` to normalize cross-browser behavior.
  _extractParameters(route, fragment) {
    const params = route.exec(fragment).slice(1);
    return params.map((param, i)=>{
      // Don't decode the search params.
      if (i === params.length - 1) return param || null;
      return param ? decodeURIComponent(param) : null;
    });
  }
  // Manually bind a single named route to a callback. For example:
  //
  //     this.route('search/:query/p:num', 'search', function(query, num) {
  //       ...
  //     });
  //
  route(route, name) {
    route = this._routeToRegExp(route);
    const callback = this[name];
    var router = this;
    this.handlers.unshift({route: route, callback: (fragment) =>{
      var args = router._extractParameters(route, fragment);
      if (router.execute(callback, args, name) !== false) {
        //router.trigger.apply(router, ['route:' + name].concat(args));
        //router.trigger('route', name, args);
        //Backbone.history.trigger('route', router, name, args);
      }
    }});
    return this;
  }
  // Execute a route handler with the provided parameters.  This is an
  // excellent place to do pre-route setup or post-route cleanup.
  execute(callback, args, name):boolean {
    return callback.apply(this, args);
  }
  checkUrl(){
    const current = this.getFragment();
    if (current === this.fragment) return false;
    this.loadUrl();
  }
  // Attempt to load the current URL fragment. If a route succeeds with a
  // match, returns `true`. If no defined routes matches the fragment,
  // returns `false`.
  loadUrl(fragment:string = null) {
    // If the root doesn't match, no routes can match either.
    if (!this.matchRoot()) return false;
    fragment = this.fragment = this.getFragment(fragment);
    for(let handler of this.handlers){
      if (handler.route.test(fragment)) {
        handler.callback(fragment);
        return true;
      }
    }
  }
  // Does the pathname match the root?
  matchRoot() {
    var path = this.decodeFragment(window.location.pathname);
    var rootPath = path.slice(0, this.root.length - 1) + '/';
    return rootPath === this.root;
  }
  // Get the pathname and search params, without the root.
  getPath() {
    const path = this.decodeFragment(
      window.location.pathname + this.getSearch()
    ).slice(this.root.length - 1);
    return path.charAt(0) === '/' ? path.slice(1) : path;
  }
  // Unicode characters in `location.pathname` are percent encoded so they're
  // decoded for comparison. `%25` should not be decoded since it may be part
  // of an encoded parameter.
  decodeFragment(fragment: string) {
    return decodeURI(fragment.replace(/%25/g, '%2525'));
  }
  // In IE6, the hash fragment and search params are incorrect if the
  // fragment contains `?`.
  getSearch() {
    var match = window.location.href.replace(/#.*/, '').match(/\?.+/);
    return match ? match[0] : '';
  }
  // Get the cross-browser normalized URL fragment from the path or hash.
  getFragment(fragment:string=null) {
    if (fragment == null) {
      fragment = this.getPath();
    }
    return fragment.replace(this.routeStripper, '');
  }
}
