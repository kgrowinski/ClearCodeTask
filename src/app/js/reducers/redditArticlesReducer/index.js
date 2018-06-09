import {FETCH_REDDIT_ARTICLES} from '../../actions/types';

const initialState = {
  redditArticles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REDDIT_ARTICLES:
      return Object.assign({}, state, {
        redditArticles: action.payload.data.data.children,
      });
    default:
      return state;
  }
}
