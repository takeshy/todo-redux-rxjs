import * as ActionType from './ActionType';
export function setRoute(path: string){
  return {
    type: ActionType.SET_ROUTE,
    payload: { path: path }
  };
}
export function setInitialData(){
  const todoApp = localStorage.getItem('todoApp');
  const payload = todoApp ? JSON.parse(todoApp) : {};
  return {
    type: ActionType.SET_INITIAL_DATA,
    payload
  };
}
export function navigateNewPost(){
  return (dispatch) => {
    dispatch({ type: ActionType.CLEAR_POST_DATA });
    dispatch({ type: ActionType.SET_ROUTE, payload: { path: '/new' }});
  }
}
export function deletePost(id){
  return {
    type: ActionType.DELETE_POST,
    payload: { id }
  };
}

export function navigateEditPost(id){
  return (dispatch, getState) => {
    const post = getState().posts.find((post)=> post.id == id);
    dispatch({ type: ActionType.SET_POST, payload: post });
    dispatch({ type: ActionType.SET_ROUTE, payload: { path: `/${id}/edit` }});
  }
}

export function setPost(payload){
  return {
    type: ActionType.SET_POST,
    payload: payload
  };
}

export function createPost(payload){
  return {
    type: ActionType.CREATE_POST,
    payload
  };
}

export function updatePost(payload){
  return {
    type: ActionType.UPDATE_POST,
    payload
  };
}

