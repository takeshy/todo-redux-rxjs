/// <reference path="../typings/index.d.ts" />
import { BehaviorSubject } from 'rxjs/behaviorSubject';
export default class Post {
  public observable: BehaviorSubject<IPost>;
  public id: number;
  constructor(state: IPost){
    this.id = state.id;
    this.observable = new BehaviorSubject<IPost>(state);
  }
  set(state: IPost){
    this.observable.next(state);
  }
}
