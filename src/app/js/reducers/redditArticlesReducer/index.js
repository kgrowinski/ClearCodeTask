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
      const { dist, children } = action.payload.data.data;

      if (!children[dist - 1] || (children[dist - 1].data.name === state.paginationData.after)) {
        return Object.assign({}, state, {
          articles: state.articles,
          paginationData: {
            ...setPaginationData(
              state.paginationData.dist,
              state.paginationData.after,
              null,
            ),
          },
        });
      }

      return Object.assign({}, state, {
        articles: children,
        paginationData: {
          ...setPaginationData(
            dist,
            children[dist - 1].data.name,
            children[0].data.name,
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

