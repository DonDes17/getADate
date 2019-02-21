import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';

import styles from './styles';

const ListItem = (props) => {
  // Vérification de la présence des props pour ensuite les afficher
  const character = props.character ? props.character : {};
  const displayDetailForCharacter = props.displayDetailForCharacter
    ? props.displayDetailForCharacter
    : '';
  const characterName = character.name ? character.name : 'Inconnu';
  const characterStatus = character.status ? character.status : 'Inconnu';

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(`my id: ${character.id}`);
        displayDetailForCharacter(character.id);
      }}
      style={styles.item_container}
    >
      <Image style={styles.image} source={{ uri: character.image }} />
      <View style={styles.content_container}>
        <View>
          <Text style={styles.name}>{characterName}</Text>
          <Text style={styles.status}>{characterStatus}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  characterName: PropTypes.string,
  characterStatus: PropTypes.string,
  styles: PropTypes.object,
  onPress: PropTypes.func,
  character: PropTypes.object,
  displayDetailForCharacter: PropTypes.func,

};

export default ListItem;
