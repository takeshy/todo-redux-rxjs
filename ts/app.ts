/// <reference path="../typings/index.d.ts" />
import 'babel-polyfill';
import configureStore from './lib/configureStore';
import { setDispatch, dispatch } from './lib/dispatch';
import { resources, mapStateToObserver } from './lib/mapStateToObserver';
import { setInitialData, setRoute } from './actions/index';
import AppRouter from './routers/appRouter';

const store = configureStore({});
store.subscribe(() => mapStateToObserver(store));
setDispatch(store);
dispatch(setInitialData());
$(()=> {
  const $elem = $("#app");
  $elem.on("click", "span[data-path]", (e)=> dispatch(setRoute($(e.currentTarget).data("path"))));
  window.router = new AppRouter(resources, $elem);
});
