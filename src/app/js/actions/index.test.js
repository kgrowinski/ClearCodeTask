import moxios from 'moxios';
import thunk from 'redux-thunk';

import configureMockStore from 'redux-mock-store';
import { FETCH_CURRENT_ARTICLE, FETCH_REDDIT_ARTICLES, FETCH_MOCK_COMMENTS } from './types';
import {
  fetchMockComments,
  fetchRedditArticles,
  fetchCurrentReddit,
} from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchRedditArticles', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returnsObject', async () => {
    const data = await fetchRedditArticles();
    expect(data instanceof Object).toBe(true);
  });

  it('returns proper type after successful fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { mockData: 'post' },
      });
    });

    const expectedActions = [
      { type: FETCH_REDDIT_ARTICLES, payload: { mockData: 'post' } },
    ];

    const store = mockStore({ posts: {} });

    return store.dispatch(fetchRedditArticles()).then(() => {
      // return of async actions
      const { payload, type } = store.getActions()[0];
      expect(payload.data).toEqual(expectedActions[0].payload);
      expect(type).toEqual(expectedActions[0].type);
    });
  });
});


describe('fetchMockComments', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returnsObject', async () => {
    const data = await fetchMockComments();
    expect(data instanceof Object).toBe(true);
  });

  it('returns proper type after successful fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { mockData: 'post' },
      });
    });

    const expectedActions = [
      { type: FETCH_MOCK_COMMENTS, payload: { mockData: 'post' } },
    ];

    const store = mockStore({ posts: {} });

    return store.dispatch(fetchMockComments()).then(() => {
      // return of async actions
      const { payload, type } = store.getActions()[0];
      expect(payload.data).toEqual(expectedActions[0].payload);
      expect(type).toEqual(expectedActions[0].type);
    });
  });
});


describe('fetchCurrentRedditArticle', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returnsObject', async () => {
    const data = await fetchCurrentReddit();
    expect(data instanceof Object).toBe(true);
  });
  it('returns proper type after successful fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { mockData: 'post' },
      });
    });

    const expectedActions = [
      { type: FETCH_CURRENT_ARTICLE, payload: { mockData: 'post' } },
    ];

    const store = mockStore({ posts: {} });

    return store.dispatch(fetchCurrentReddit()).then(() => {
      // return of async actions
      const { payload, type } = store.getActions()[0];
      expect(payload.data).toEqual(expectedActions[0].payload);
      expect(type).toEqual(expectedActions[0].type);
    });
  });
});
