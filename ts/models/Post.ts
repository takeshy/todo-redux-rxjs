import Model from "../lib/model";

export default class Post extends Model<IPost> {
  public id: number;

  constructor(state: IPost) {
    super(state);
    this.id = state.id;
  }
}
