import { FETCH_REDDIT_ARTICLES, SET_PAGINATION_DATA } from '../../actions/types';
import Config from '../../configuration';

const { articlesAmmount, paginationLimit } = Config;

const initialState = {
  articles: [],
  paginationData: {
    limit: paginationLimit,
    nextAfter: 0,
    firstPagination: 1,
    currentPagination: 1,
    paginationSize: (articlesAmmount / paginationLimit) + 1,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REDDIT_ARTICLES:
      return Object.assign({}, state, {
        articles: action.payload.data.data.children,
      });
    case SET_PAGINATION_DATA:
      return Object.assign({}, state, {
        paginationData: action.payload,
      });
    default:
      return state;
  }
}

