import { FETCH_REDDIT_ARTICLES, SET_PAGINATION_DATA } from '../../actions/types';
import Config from '../../configuration';

const { paginationLimit } = Config;

const initialState = {
  articles: [],
  paginationData: {
    dist: 0,
    after: '',
    limit: paginationLimit,
    nextAfter: 0,
    firstPagination: 1,
    currentPagination: 1,
  },
};

const setPaginationData = (prevDist, dist, limit, after) => ({
  dist: prevDist + dist,
  paginationSize: ((prevDist + dist) / limit) + 1,
  after,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REDDIT_ARTICLES:
      return Object.assign({}, state, {
        articles: [...state.articles, ...action.payload.data.data.children],
        paginationData: {
          ...state.paginationData,
          ...setPaginationData(
            state.paginationData.dist,
            action.payload.data.data.dist,
            state.paginationData.limit,
            action.payload.data.data.after,
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

