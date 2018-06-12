import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { mount, shallow } from 'enzyme';

import Container, { ArticleDumb } from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initialStore = {
  redditArticles: {
    articles: [{
      data: { id: 1 },
    }],
    mockComments: [
      { id: 1, data: { postId: 'TEST', created: moment().unix() } },
      { id: 2, data: { postId: 1, created: moment().unix() } },
    ],
    currentReddit: {
      data: {
        author: 'TEST',
        selftext: 'TEST',
        created: moment().unix(),
      },
      comments: [
        { id: 5, data: { created: moment().unix() } },
        { id: 6, data: { created: moment().unix() } },
      ],
    },
    paginationData: {
      dist: 1,
      before: 'TEST',
      after: 'TEST2',
    },
  },
};

const match = {
  params: {
    id: 'TEST',
  },
};


describe('Article', () => {
  it('renders itself', () => {
    const component = mount(
      <MemoryRouter>
        <Container match={match} store={mockStore(initialStore)} />
      </MemoryRouter>);

    expect(component.length).toEqual(1);
    component.unmount();
  });

  it('renders without data', () => {
    const component = mount(<ArticleDumb match={match} />);
    expect(component.find('.container').length).toEqual(0);
  });

  it('renders Comments', () => {
    const component = mount(<ArticleDumb
      match={match}
      activeReddit={initialStore.redditArticles.currentReddit}
      mockComments={initialStore.redditArticles.mockComments}
    />);
    expect(component.find('.list-group').children().length).toEqual(3);
  });

  it('calls publish comments', () => {
    const spy = jest.fn();
    ArticleDumb.prototype.publishFakeComment = spy;
    const component = mount(<ArticleDumb
      match={match}
      activeReddit={initialStore.redditArticles.currentReddit}
      mockComments={initialStore.redditArticles.mockComments}
    />);
    component.find('form').at(0).simulate('submit');
    expect(spy).toBeCalled();
  });
});
