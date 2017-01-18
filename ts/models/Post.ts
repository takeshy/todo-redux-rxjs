import Model from "../lib/model";

export default class Post extends Model<IPost> {
  constructor(state: IPost) {
    super(state);
    this.id = state.id;
  }
}
