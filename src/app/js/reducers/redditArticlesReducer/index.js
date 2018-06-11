import { FETCH_REDDIT_ARTICLES, SET_PAGINATION_DATA, FETCH_CURRENT_ARTICLE } from '../../actions/types';
import Config from '../../configuration';

const { paginationLimit } = Config;

const initialState = {
  articles: [],
  currentReddit: {},
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
  if (action.type === FETCH_CURRENT_ARTICLE) {
    const { data } = action.payload;
    return Object.assign({}, state, {
      currentReddit: {
        data: data[0].data.children[0].data,
        comments: data[data.length - 1].data.children,
      },
    });
  } else if (action.type === FETCH_REDDIT_ARTICLES) {
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
  } else if (action.type === SET_PAGINATION_DATA) {
    return Object.assign({}, state, {
      paginationData: action.payload,
    });
  }
  return state;
}

