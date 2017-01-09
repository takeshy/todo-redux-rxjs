import Route from '../models/Route';
import Post from '../models/Post';
import Posts from '../models/Posts';

export interface IResources {
  route: Route;
  post: Post;
  posts: Posts;
}

export const resources: IResources = {
  route: null,
  post: null,
  posts: null
};

export function mapStateToObserver(store) {
  const state = store.getState()
  if(resources.route === null){
    resources.route = new Route(state.route);
    resources.post = new Post(state.post);
    resources.posts = new Posts(state.posts);
  } else {
    resources.route.set(state.route);
    resources.post.set(state.post);
    resources.posts.set(state.posts);
  }
};
