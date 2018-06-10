import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Container, { HomePageDumb } from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initialStore = {
  redditArticles: {
    articles: [],
    paginationData: {
      limit: 5,
      nextAfter: 0,
      firstPagination: 1,
      currentPagination: 1,
      paginationSize: 20,
    },
  },
};

describe('HomePage', () => {
  it('renders itself', () => {
    const component = mount(<Container store={mockStore(initialStore)} />);
    expect(component.length).toEqual(1);
    component.unmount();
  });
});
