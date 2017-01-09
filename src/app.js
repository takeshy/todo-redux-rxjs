import Backbone from 'backbone';
import $ from 'jquery';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { setDispatch, dispatch } from './dispatch';
import AppRouter from './backbone/routers/AppRouter';
import { resources, mapStateToBackbone } from './map_state_to_backbone';
import { setInitialData, setRoute } from './redux/actions';
Backbone.sync = ()=>{};

const store = createStore(reducers, {}, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
store.subscribe(() => mapStateToBackbone(store.getState()));
setDispatch(store.dispatch);
dispatch(setInitialData());

$(()=> {
  const $elem = $("#app");
  $elem.on("click", "span[data-path]", (e)=> dispatch(setRoute($(e.currentTarget).data("path"))));
  window.router = new AppRouter({ resources, $elem });
  Backbone.history.start();
});
