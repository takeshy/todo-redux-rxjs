import { PostsCollection, Post } from './backbone/models/Post';

export const resources = {
  posts: new PostsCollection(),
  post: new Post(),
  route: new Backbone.Model()
};

export function mapStateToBackbone(state) {
  localStorage.setItem("todoApp", JSON.stringify(state));
  resources.posts.set(state.posts);
  resources.post.set(state.post);
  resources.route.set(state.route);
  return;
}
