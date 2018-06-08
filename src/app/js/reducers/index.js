import {combineReducers} from 'redux';
import mockCommentReducer from './mockCommentsReducer';
import redditCommentReducer from './redditCommentsReducer';
import redditArticlesReducer from './redditArticlesReducer';

const rootReducer = combineReducers({
  mockComments: mockCommentReducer,
  redditComments: redditCommentReducer,
  redditArticles: redditArticlesReducer,
});

export default rootReducer;