import { BehaviorSubject, Subject, Observable } from "rxjs/Rx";
import Model from "./model";

interface S {
  id: number;
  [key: string]: any;
}

abstract class Collection<State extends S, M extends Model<State>, > {
  public subject$: BehaviorSubject<M[]>;

  constructor(state: State[]) {
    this.subject$ = new BehaviorSubject(state.map((m) => new this.model(m)));
  }

  abstract get model(): { new(state): M };
  get adds$() {
    return this.subject$
      .pairwise()
      .mergeMap(([prev, current]) => {
        const prevIDs = prev.map((m) => m.id);
        const adds = current.filter((m) => prevIDs.indexOf(m.id) === -1);
        return Observable.from(adds);
      });
  }

  get removes$() {
    return this.subject$
      .pairwise()
      .map(([prev, current]) => {
        const currentIDs = current.map((m) => m.id);
        const removes = prev.filter((m) => currentIDs.indexOf(m.id) === -1);
        return removes;
      })
      .filter((removes) => removes.length > 0)
      .mergeMap((removes) => Observable.from(removes));
  }

  get changes$() {
    return this.subject$
      .mergeMap((models) => Observable.from(models.map((m) => m.changes$)))
      .mergeMap((change) => change);
  }

  set(state: State[]) {
    const newValues = [];
    state.forEach((value) => {
      const target = this.subject$.value.filter((m) => m.id === value.id)[0];
      if (target) {
        target.set(value);
        newValues.push(target);
      } else {
        newValues.push(new this.model(value));
      }
    });
    this.subject$.next(newValues);
  }

  add(value: State): void {
    this.subject$.next([...this.subject$.value, new this.model(value)]);
  }
}

export default Collection;
