let _store = null;
export function setDispatch(store) {
  _store = store;
}
export function dispatch(...arg) {
  return _store.dispatch(...arg);
}
