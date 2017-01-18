import { BehaviorSubject } from "rxjs/Rx";

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
  public id: number;
  public subject$: BehaviorSubject<T>;
  public attributes: Readonly<T>;
  public attributes$: ObservableAttributes<T>;

  constructor(state: T) {
    this.attributes = state;
    this.subject$ = new BehaviorSubject(state);
    this.attributes$ = <ObservableAttributes<T>>Object.keys(state).reduce((obj, key) => {
      obj[key] = new BehaviorSubject(state[key]);
      return obj;
    }, {});
  }

  get changes$() {
    return this.subject$
      .pairwise()
      .map(([prev, current]) => {
        return Object.keys(prev).reduce((obj, key) => {
          if (prev[key] !== current[key]) {
            obj[key] = current[key];
          }
          return obj;
        }, {});
      })
      .filter((changed) => Object.keys(changed).length > 0);
  }

  set(values: Partial<T>) {
    Object.keys(values)
      .filter((key) => this.subject$.value[key] !== values[key])
      .forEach((key) => this.attributes$[key].next(values[key]));
    this.subject$.next(Object.assign({}, this.subject$.value, values));
  }
}

export default Model;
