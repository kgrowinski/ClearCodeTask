/* eslint-disable no-case-declarations */
import {
  FETCH_REDDIT_ARTICLES,
  FETCH_CURRENT_ARTICLE,
  FETCH_MOCK_COMMENTS,
} from '../../actions/types';
import Config from '../../configuration';

const { paginationLimit } = Config;

const initialState = {
  articles: [],
  currentReddit: {
    data: {},
    comments: [],
  },
  mockComments: [],
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
    case FETCH_CURRENT_ARTICLE:
      return Object.assign({}, state, {
        currentReddit: {
          data: action.payload.data[0].data.children[0].data,
          comments: action.payload.data[action.payload.data.length - 1].data.children,
        },
      });
    case FETCH_MOCK_COMMENTS:
      return Object.assign({}, state, {
        mockComments: action.payload.data,
      });
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
    default:
      return state;
  }
}

