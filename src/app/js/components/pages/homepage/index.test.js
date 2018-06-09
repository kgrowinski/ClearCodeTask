import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Container, { HomePageDumb } from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initialStore = {
  redditComments: [],
  mockComments: { mockComments: [] },
  redditArticles: [],
};

describe('HomePage', () => {
  it('renders itself', () => {
    const component = mount(<Container store={mockStore(initialStore)} />);
    expect(component.length).toEqual(1);
    component.unmount();
  });
});
