import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View, FlatList, TextInput, StatusBar, ActivityIndicator, Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem } from '../components/ListItem/index';

import { getCharacters, getMorePages } from '../redux/actions/charactersActions';


class PageList extends Component {
  constructor(props) {
    super(props);

    this.page = 0;
  }


  componentWillMount() {
    // on charge tous les personnages en appelant l'action getCharacters
    this.props.dispatch(getCharacters());
  }

    _loadPages = (page) => {
      // on charge d'autres pages en appelant l'action getMorepages
      this.props.dispatch(getMorePages(page));
    }

    _displayDetailForCharacter = (id) => {
      // passe l'id  du personnage en props de navigation en poussant la vue
      this.props.navigation.navigate('CharacterDetails', { id });
    }

    // affiche un meesage d'erreur via alert pop-up
    _displayError = () => (
      this.props.error
        ? Alert.alert(
          'Une erreur est survenue',
          `${this.props.error}`,
        )
        : null
    );

    // affichage du loader pour user en attendant la fin de la requête
    _displayIndicator = () => (
      this.props.loading
        ? (
          <View style={styles.loading_container}>
            <ActivityIndicator size="large" />
          </View>
        )
        : null
    )


    render() {
      const pagesTotal = this.props.pagesTotal ? this.props.pagesTotal : '';

      return (
        <View style={styles.main_container}>
          <StatusBar translucent={false} barStyle="light-content" />
          <Icon name="comments" style={styles.icon} />
          <View style={styles.input_container}>
            <TextInput
              style={styles.input}
              placeholder="Rechercher"
              placeholderTextColor="grey"
              onChangeText={() => {}}
              onSubmitEditing={() => {}}
            />
          </View>
          {this._displayError()}
          {this._displayIndicator()}
          <View style={styles.flatList_container}>
            <FlatList
              data={this.props.characters}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <ListItem
                  character={item}
                  displayDetailForCharacter={this._displayDetailForCharacter}
                />
              )
                          }
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                // vérifivation du nombre de pages avant d'en charger un autre
                if (this.page < pagesTotal.pages) {
                  this._loadPages(this.page + 1);
                }
              }}

            />
          </View>
        </View>
      );
    }
}

PageList.propTypes = {
  style: PropTypes.object,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  character: PropTypes.object,
};


const styles = EStyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '$primaryColor',
    alignItems: 'center',
    paddingTop: '10%',
  },
  flatList_container: {
    flex: 1,
    width: '100%',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    marginTop: 10,
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 30,
  },
  input: {
    height: 35,
    padding: 10,
    backgroundColor: '$lightBG',
    borderRadius: 15,

  },
  icon: {
    color: '$secondaryColor',
    fontSize: 45,
  },
});

const mapStateToProps = state => ({
  loading: state.loading,
  characters: state.characters,
  MoreCharacters: state.MoreCharacters,
  error: state.error,
  pagesTotal: state.info,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => { dispatch(action); },
});


export default connect(mapStateToProps, mapDispatchToProps)(PageList);
