var _dispatch = null;
export function setDispatch(dispatch) {
  _dispatch = dispatch;
}
export function dispatch(...arg) {
  return _dispatch(...arg);
}
