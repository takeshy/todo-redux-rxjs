import { BehaviorSubject } from "rxjs/behaviorSubject";

interface S {
  [key: string]: any;
}

interface IChangeStream<T extends S> {
  value: T;
  changed: Partial<T>;
}

type ObservableAttributes<T> = {
  [P in keyof T]: BehaviorSubject<T[P]>;
};

abstract class Model<T extends S> {
  public observable: BehaviorSubject<IChangeStream<T>>;
  public observableAttributes: ObservableAttributes<T>;

  constructor(state: T) {
    this.observable = new BehaviorSubject<IChangeStream<T>>({
      changed: <Partial<T>>{},
      value: state
    });
    this.observableAttributes = <ObservableAttributes<T>>Object.keys(state).reduce((obj, key) => {
      obj[key] = new BehaviorSubject(state[key]);
      return obj;
    }, {});
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

    Object.keys(changed).forEach((key) => {
      this.observableAttributes[key].next(changed[key]);
    });
  }
}

export default Model;
