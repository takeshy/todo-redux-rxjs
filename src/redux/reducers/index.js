import { combineReducers } from 'redux'
import posts from './Posts'
import post from './Post'
import route from './Route'
export default combineReducers({ route, posts, post });
