import {
  FETCH_REDDIT_ARTICLES,
  FETCH_CURRENT_ARTICLE,
  FETCH_MOCK_COMMENTS,
} from '../../actions/types';
import redditArticleReducer from './index';

import { articleData, currentRedditData, mockComments } from '../../configuration/mockData';

const initialState = {
  articles: [],
  currentReddit: {
    data: {},
    comments: [],
  },
  mockComments: [],
  paginationData: {
    dist: 5,
    before: null,
    after: null,
  },
};

describe('reddit articles reducer', () => {
  it('should return the initial state', () => {
    expect(redditArticleReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_REDDIT_ARTICLES action type', () => {
    const mockAction = {
      type: FETCH_REDDIT_ARTICLES,
      payload: {
        data: articleData,
      },
    };

    expect(redditArticleReducer(undefined, mockAction).articles.length).toBe(2);
  });

  it('should handle FETCH_CURRENT_ARTICLE action type', () => {
    const mockAction = {
      type: FETCH_CURRENT_ARTICLE,
      payload: {
        data: currentRedditData,
      },
    };

    expect(redditArticleReducer(undefined, mockAction).currentReddit.comments.length).toBe(1);
  });

  it('should handle FETCH_REDDIT_ARTICLES action type with the same after', () => {
    const mockAction = {
      type: FETCH_REDDIT_ARTICLES,
      payload: {
        data: articleData,
      },
    };

    const state = initialState;
    state.articles = articleData;
    const { dist, children } = articleData.data;
    state.paginationData.after = children[dist - 1].data.name;


    expect(redditArticleReducer(state, mockAction).paginationData.before).toBe(null);
  });

  it('should handle FETCH_MOCK_COMMENTS action type', () => {
    const mockAction = {
      type: FETCH_MOCK_COMMENTS,
      payload: {
        data: mockComments,
      },
    };

    expect(redditArticleReducer(undefined, mockAction).mockComments.length).toBe(2);
  });
});
