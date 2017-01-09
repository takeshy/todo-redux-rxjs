import * as ActionType from '../constants/ActionType';

function Posts(state = [], action) {
  switch(action.type) {
    case ActionType.SET_INITIAL_DATA:
      if(action.payload.posts) {
        return action.payload.posts;
      } else {
        return state;
      }
    case ActionType.CREATE_POST:
      return [...state, action.payload];
    case ActionType.UPDATE_POST:
      return state.map((post)=> post.id == action.payload.id ? action.payload : post );
    case ActionType.DELETE_POST:
      return state.filter((post)=> post.id != action.payload.id);
    default:
      return state;
  }
}
export default Posts;
