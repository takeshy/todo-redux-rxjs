/// <reference path="../typings/index.d.ts" />
import { BehaviorSubject } from 'rxjs/behaviorSubject';
import Post from './Post';
export default class Posts {
  public observable: BehaviorSubject<Post[]>;
  constructor(state: IPost[]){
    this.observable = new BehaviorSubject(state.map((m)=> new Post(m)));
  }
  set(state: IPost[]){
    this.observable.next(state.map((m)=> new Post(m)));
  }
}