import React from 'react';
import {shallow} from 'enzyme';

import HomePage from './index';

describe('homepage', () => {
  it('renders', ()=> {
    const component = shallow(<HomePage />);
    expect(component.length).toEqual(1);
  });
});