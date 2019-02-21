import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import EStyleSheet from 'react-native-extended-stylesheet';
import { getCharactersDetails } from '../redux/actions/charactersActions';


class CharacterDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
    };
  }

  componentDidMount() {
    // Récupération de l'id du personnage choisi par user
    const CharacterId = this.props.navigation.state.params.id;
    // appel de l'actiob getCharactersDetails grace à cette id
    this.props.dispatch(getCharactersDetails(CharacterId));
  }

  // affiche un meesage d'erreur via alert pop-up
  _displayError = () => (this.props.error ? Alert.alert('Une erreur est survenue', `${this.props.error}`) : null);


  _displayIndicator = () => (this.props.loading ? (
    <View style={styles.loading_container}>
      <ActivityIndicator size="large" />
    </View>
  ) : null);

  _addToFavorites = () => {
    this.setState({ isFavorite: !this.state.isFavorite })
  }

  _displayFavoriteIcon= () => {
    if (this.state.isFavorite) {
      return <Image source={require('../images/heart-full.png')} style={styles.heart} />;
    }
    return <Image source={require('../images/heart-empty.png')} style={styles.heart} />;
  }

  render() {
    // Vérification de la présence des props pour affichage
    const character = this.props.myCharacter ? this.props.myCharacter : {};
    const origin = character.origin ? character.origin.name : 'inconnu';

    return (
      <View style={styles.main_container}>
        <ImageBackground source={require('../images/tinder_Profile.png')} imageStyle={{ resizeMode: 'stretch' }} style={styles.imageBg}>
          {this._displayIndicator()}
          <View style={styles.content}>
            <Image source={{ uri: character.image }} style={styles.imageProfile} />
            <Text style={styles.characName}>{character.name}</Text>
            <Text style={styles.characStatus}>{character.status}</Text>
          </View>
          {this._displayError()}
          <TouchableOpacity onPress={() => this._addToFavorites()}>
            {this._displayFavoriteIcon()}
          </TouchableOpacity>
          <View style={styles.sub_content}>
            <View style={{ display: 'flex', flexDirection: 'row', paddingBottom: '2%' }}>
              <Icon name="paw" style={styles.icon} />
              <Text style={styles.characSpecies}>{character.species}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingBottom: '2%' }}>
              <Icon name="map-marker" style={styles.icon} />
              <Text style={styles.characOrigin}>{origin}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingBottom: '2%' }}>
              <Icon name="transgender" style={styles.icon} />
              <Text style={styles.characGender}>{character.gender}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

CharacterDetails.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  style: PropTypes.object,
  origin: PropTypes.object,
  species: PropTypes.string,
  gender: PropTypes.string,
  character: PropTypes.object,
};

const styles = EStyleSheet.create({
  main_container: {
    flex: 1,
    height: '100%',
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
  imageBg: {
    flex: 1,
    height: '100%',
    width: '100%',

  },
  content: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '11%' : '8%',
  },
  sub_content: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '22%',

  },
  imageProfile: {
    height: 150,
    width: 150,
    backgroundColor: 'grey',
    borderRadius: 75,
  },
  characName: {
    fontSize: 30,
    color: '$primaryColor',
    fontWeight: 'bold',
    paddingTop: '5%',
  },
  characStatus: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '$secondaryColor',
    paddingTop: '8%',
  },
  characSpecies: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$secondaryColor',
    paddingBottom: Platform.OS === 'ios' ? '5%' : '3%',
  },
  characOrigin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$secondaryColor',
    paddingBottom: Platform.OS === 'ios' ? '5%' : '3%',
  },
  simpleText: {
    fontSize: 22,
    color: '$lightBG',
    paddingBottom: '2%',
  },
  characGender: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$secondaryColor',
    paddingBottom: Platform.OS === 'ios' ? '5%' : '3%',
  },
  icon: {
    color: '$secondaryColor',
    fontSize: 28,
    marginRight: '3%',
  },
  heart: {
    height: 45,
    width: 45,
    marginLeft: '46%',
    marginTop: Platform.OS === 'ios' ? '13%' : '9%',
    resizeMode: 'contain',
  },
});

const mapStateToProps = state => ({
  loading: state.loading,
  myCharacter: state.myCharacter,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterDetails);
