import axios from 'axios';

import { FETCH_MOCK_COMMENTS, FETCH_REDDIT_ARTICLES, SET_PAGINATION_DATA } from './types';

export const fetchMockComments = () => async (dispatch) => {
  // TODO: Add error handling.
  const res = await axios.get('http://localhost:3300/comments');

  dispatch({
    type: FETCH_MOCK_COMMENTS,
    payload: res,
  });
};

export const fetchRedditArticles = () => async (dispatch) => {
  const res = await axios.get('http://www.reddit.com/r/subreddit/new/.json?', {
    params: {
      limit: 100,
    },
  });

  dispatch({
    type: FETCH_REDDIT_ARTICLES,
    payload: res,
  });
};

export const setPaginationData = paginationData => ({
  type: SET_PAGINATION_DATA,
  payload: paginationData,
});
