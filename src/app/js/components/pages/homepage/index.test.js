import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Container, { HomePageDumb } from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initialStore = {
  redditArticles: {
    articles: [{
      data: { id: 1 },
    }],
    currentReddit: {},
    paginationData: {
      dist: 1,
      before: 'TEST',
      after: 'TEST2',
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
    const component = mount(
      <MemoryRouter>
        <Container match={match} store={mockStore(initialStore)} />
      </MemoryRouter>);

    expect(component.length).toEqual(1);
    component.unmount();
  });

  it('renders without data', () => {
    const paginationData = {
      dist: false,
      before: 'TEST',
      after: 'TEST2',
    };
    const component = mount(
      <MemoryRouter>
        <HomePageDumb
          someProp={1}
          match={match}
          paginationData={paginationData}
        />
      </MemoryRouter>);
    expect(component.find('h4').length).toBe(1);
  });

  it('Allow onClick on pagination', () => {
    const mockCallback = jest.fn();
    HomePageDumb.prototype.changePagination = mockCallback;
    const component = mount(
      <MemoryRouter>
        <HomePageDumb
          someProp={1}
          match={match}
          paginationData={initialStore.redditArticles.paginationData}
        />
      </MemoryRouter>);
    component.find('.next').simulate('click');
    expect(mockCallback).toBeCalled();
    component.find('.previous').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  it('calls fetch on componentDidMount', () => {
    const mockCallback = jest.fn();
    expect(mockCallback.mock.calls.length).toBe(0);
    const component = mount(
      <MemoryRouter>
        <HomePageDumb
          match={match}
          paginationData={initialStore.redditArticles.paginationData}
          redditArticles={initialStore.redditArticles.articles}
          fetchRedditArticles={mockCallback}
        />
      </MemoryRouter>);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('fetch recives args based on match parameter', () => {
    const mockCallback = jest.fn();
    expect(mockCallback.mock.calls.length).toBe(0);
    const component = mount(
      <MemoryRouter>
        <HomePageDumb
          match={match}
          paginationData={initialStore.redditArticles.paginationData}
          redditArticles={initialStore.redditArticles.articles}
          fetchRedditArticles={mockCallback}
        />
      </MemoryRouter>);
    expect(mockCallback.mock.calls[0][1]).toEqual(match.params.id);
  });

  it('calls fetch on after', () => {
    const mockCallback = jest.fn();
    const newMatch = {
      params: {
        id: 'AFTER',
      },
    };
    const paginationData = {
      dist: 1,
      before: 'TEST',
      after: 'AFTER',
    };
    const component = shallow(
      <HomePageDumb
        match={newMatch}
        paginationData={paginationData}
        redditArticles={initialStore.redditArticles.articles}
        fetchRedditArticles={mockCallback}
      />
    );
    component.update();
    expect(mockCallback.mock.calls[0][1]).toBe(paginationData.after);
  });

it('calls fetch on before', () => {
    const mockCallback = jest.fn();
    const newMatch = {
      params: {
        id: 'BEFORE',
      },
    };
    const paginationData = {
      dist: 1,
      before: 'BEFORE',
      after: 'TEST',
    };
    const component = shallow(
      <HomePageDumb
        match={newMatch}
        paginationData={paginationData}
        redditArticles={initialStore.redditArticles.articles}
        fetchRedditArticles={mockCallback}
      />
    );
    component.update();
    expect(mockCallback.mock.calls[0][1]).toBe(paginationData.before);
  });

});
