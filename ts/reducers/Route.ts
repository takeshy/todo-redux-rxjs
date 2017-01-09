import * as ActionType from '../actions/ActionType';
function Route(state = {}, action) {
  switch(action.type) {
    case ActionType.SET_INITIAL_DATA:
      if(action.payload.route) {
        return action.payload.route;
      } else {
        return { path: '/' };
      }
    case ActionType.SET_ROUTE:
      return { path: action.payload.path };
    default:
      return state;
  }
}
export default Route;
