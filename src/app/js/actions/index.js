import axios from 'axios';
import Config from '../configuration';
import { FETCH_MOCK_COMMENTS, FETCH_REDDIT_ARTICLES, SET_PAGINATION_DATA } from './types';

const { redditArticlesURL, mockCommentsURL, articlesAmmount } = Config;

export const fetchMockComments = () => async (dispatch) => {
  // TODO: Add error handling.
  const res = await axios.get(mockCommentsURL);

  dispatch({
    type: FETCH_MOCK_COMMENTS,
    payload: res,
  });
};

export const fetchRedditArticles = (limit = articlesAmmount, after = null) => async (dispatch) => {
  const res = await axios.get(redditArticlesURL, {
    params: {
      limit,
      after,
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
