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
  public changes$: BehaviorSubject<IChangeStream<T>>;
  public attributes: Readonly<T>;
  public attributes$: ObservableAttributes<T>;

  constructor(state: T) {
    this.attributes = state;
    this.changes$ = new BehaviorSubject<IChangeStream<T>>({
      changed: <Partial<T>>{},
      value: state
    });
    this.attributes$ = <ObservableAttributes<T>>Object.keys(state).reduce((obj, key) => {
      obj[key] = new BehaviorSubject(state[key]);
      return obj;
    }, {});
  }

  set(values: Partial<T>) {
    const current = this.changes$.getValue().value;
    const changed = Object.keys(current).reduce((obj, key) => {
      if (current[key] !== values[key]) {
        obj[key] = values[key];
      }
      return obj;
    }, {});

    const newValue = Object.assign({}, current, values);
    this.attributes = newValue;
    this.changes$.next({
      value: newValue,
      changed: <Partial<T>>changed
    });
    Object.keys(changed).forEach((key) => {
      this.attributes$[key].next(changed[key]);
    });
  }
}

export default Model;
