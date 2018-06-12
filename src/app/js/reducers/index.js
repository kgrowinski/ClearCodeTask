import { combineReducers } from 'redux';
import redditArticlesReducer from './redditArticlesReducer';

const rootReducer = combineReducers({
  redditArticles: redditArticlesReducer,
});

export default rootReducer;
