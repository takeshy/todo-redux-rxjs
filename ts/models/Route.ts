/// <reference path="../typings/index.d.ts" />
import { BehaviorSubject } from 'rxjs/behaviorSubject';
export default class Route {
  public observable: BehaviorSubject<IRoute>;
  constructor(state: IRoute){
    this.observable = new BehaviorSubject(state);
  }
  set(state: IRoute){
    this.observable.next(state);
  }
}
