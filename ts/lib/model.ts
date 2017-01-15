import { BehaviorSubject } from "rxjs/behaviorSubject";

interface S {
  [key: string]: any;
}

interface IChangeStream<T extends S> {
  value: T;
  changed: Partial<T>;
}

abstract class Model<T extends S> {
  public observable: BehaviorSubject<IChangeStream<T>>;

  constructor(state: T) {
    this.observable = new BehaviorSubject<IChangeStream<T>>({
      changed: <Partial<T>>{},
      value: state
    });
  }

  set(values: Partial<T>) {
    const current = this.observable.getValue().value;
    const changed = Object.keys(current).reduce((obj, key) => {
      if (current[key] !== values[key]) {
        obj[key] = values[key];
      }
      return obj;
    }, {});
    this.observable.next({
      value: Object.assign({}, current, values),
      changed: <Partial<T>>changed
    });
  }
}

export default Model;
