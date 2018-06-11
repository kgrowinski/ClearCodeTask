import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Config from '../../../configuration';
import Container, { HomePageDumb } from './index';

const { paginationLimit } = Config;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initialStore = {
  redditArticles: {
    articles: [],
    paginationData: {
      dist: 0,
      after: '',
      limit: paginationLimit,
      nextAfter: 0,
      firstPagination: 1,
      currentPagination: 1,
    },
  },
};
const match = {
  params: {
    id: 1,
  },
};

describe('HomePage', () => {
  it('renders itself', () => {
    const component = mount(<Container match={match} store={mockStore(initialStore)} />);
    expect(component.length).toEqual(1);
    component.unmount();
  });
});
