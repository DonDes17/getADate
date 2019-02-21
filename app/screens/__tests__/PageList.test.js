import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import PageList from '../PageList';

const mockStore = configureMockStore();
const initialState = {};

describe('PageList', () => {
  it('renders ListItem in store context', () => {
    const rendered = shallow(<PageList />, {
      context: { store: mockStore(initialState) },
    });

    expect(rendered).toMatchSnapshot();
  });
});
