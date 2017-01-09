import * as ActionType from '../constants/ActionType';

const InitialState = {
  title: '',
  content: ''
};

function Post(state = InitialState, action) {
  switch(action.type) {
    case ActionType.SET_INITIAL_DATA:
      if(action.payload.post) {
        return action.payload.post;
      } else {
        return InitialState;
      }
    case ActionType.CLEAR_POST_DATA:
      return InitialState;
    case ActionType.SET_POST:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
export default Post;
