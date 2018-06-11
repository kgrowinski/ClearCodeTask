import { FETCH_REDDIT_ARTICLES, SET_PAGINATION_DATA } from '../../actions/types';
import Config from '../../configuration';

const { paginationLimit } = Config;

const initialState = {
  articles: [],
  paginationData: {
    dist: paginationLimit,
    before: null,
    after: null,
  },
};

const setPaginationData = (dist, after, before) => ({
  dist,
  after,
  before,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REDDIT_ARTICLES:
      return Object.assign({}, state, {
        articles: action.payload.data.data.children,
        paginationData: {
          ...state.paginationData,
          ...setPaginationData(
            action.payload.data.data.dist,
            action.payload.data.data.children[4].data.name,
            action.payload.data.data.children[0].data.name,
          ),
        },
      });
    case SET_PAGINATION_DATA:

      return Object.assign({}, state, {
        paginationData: action.payload,
      });
    default:
      return state;
  }
}

