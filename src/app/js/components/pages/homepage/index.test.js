import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Container, {HomePage} from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initialStore = {
  mockComments: {mockComments: [],},
  redditComments: [],
  redditArticles: [],
};

describe('HomePage', () => {
  it('renders itself', () => {
    const component = mount(<Container store={mockStore(initialStore)}/>);
    expect(component.length).toEqual(1);
    component.unmount();

  });
});