import Collection from "../lib/collection";
import Post from "./Post";

interface S {
  [key: string]: any;
}

export default class Posts extends Collection<IPost, Post> {
  get model() {
    return Post;
  }
}
