import {
  fetchMockComments,
  fetchRedditArticles,
  setPaginationData,
} from './index';

describe('setPaginationData', () => {
  it('returnsObject', () => {
    const parameter = 1;
    expect(setPaginationData(parameter) instanceof Object).toBe(true);
  });
});

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

