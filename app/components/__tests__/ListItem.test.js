import React from 'react';
import renderer from 'react-test-renderer';
import { View, TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';

import { ListItem, styles } from '../ListItem/index';

describe('ListItem', () => {
  it('export styles object', () => {
    expect(typeof styles).toBe('object');
  });

  it('renders ListItem with children props', () => {
    const rendered = renderer
      .create(
        <ListItem>
          <View />
        </ListItem>,
      )
      .toJSON();
    expect(rendered).toBeTruthy();
  });

  it('handle a press event', () => {
    const callback = jest.fn();

    const wrapper = shallow(<ListItem onPress={callback} />);

    expect(wrapper.find(TouchableOpacity).length).toBe(1);
  });
});
