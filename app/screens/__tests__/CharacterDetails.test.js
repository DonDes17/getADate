import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import CharacterDetails from '../CharacterDetails';

const mockStore = configureMockStore();
const initialState = {};

describe('CharacterDetails', () => {
  it('renders CharacterDetails in store context', () => {
    const navigation = { state: { params: { type: 'id' } } };
    const rendered = shallow(<CharacterDetails navigation={navigation} />, {
      context: { store: mockStore(initialState) },
    });
    expect(rendered).toMatchSnapshot();
  });
});
