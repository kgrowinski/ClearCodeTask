import { FETCH_REDDIT_COMMENTS } from '../../actions/types';

const initialState = {
  redditComments: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REDDIT_COMMENTS:
      return Object.assign({}, state, {
        redditComments: action.payload.data,
      });
    default:
      return state;
  }
}
