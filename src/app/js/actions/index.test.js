import {
  fetchMockComments,
  fetchRedditArticles,
} from './index';

describe('fetchRedditArticles', () => {
  it('returnsObject', async () => {
    const data = await fetchRedditArticles();
    expect(data instanceof Object).toBe(true);
  });
});

describe('fetchMockComments', () => {
  it('returnsObject', async () => {
    const data = await fetchMockComments();
    expect(data instanceof Object).toBe(true);
  });
});

