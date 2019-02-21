import { createAppContainer, createStackNavigator } from 'react-navigation';
import PageList from '../screens/PageList';
import CharacterDetails from '../screens/CharacterDetails';

const CharactersStackNavigator = createStackNavigator({
  PageList: {
    screen: PageList,
    navigationOptions: {
      title: 'Profils',
      header: null,
    },
  },
  CharacterDetails: {
    screen: CharacterDetails,
    navigationOptions: {
      title: 'Details',
      headerTintColor: '#87CB8F',
      headerStyle: {
        backgroundColor: '#3C4550',
        fontSize: 16,
      },
      headerTitleStyle: {
        color: '#87CB8F',
      },
    },
  },
});

const AppStackContainer = createAppContainer(CharactersStackNavigator);

export default AppStackContainer;
