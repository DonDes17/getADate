import {
  GET_CHARACTERS,
  CHARACTERS_RECEIVED,
  CHARACTERS_REQUEST_FAILED,
  GET_CHARACTER_DETAILS,
  DETAILS_RECEIVED,
  DETAILS_REQUEST_FAILED,
  GET_MORE_PAGES,
  PAGES_RECEIVED,
  PAGES_REQUEST_FAILED,
} from '../constants';

const initialState = {};

const CharacterReducer = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case GET_CHARACTERS:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case CHARACTERS_RECEIVED:
      // copie du state initial et ajout des personnages reçus
      nextState = {
        ...state,
        characters: action.characters,
        loading: false,
        info: action.info,
      };
      return nextState || state;
    case CHARACTERS_REQUEST_FAILED:
      // copie du state initial et ajout du message d'erreur
      nextState = {
        ...state,
        error: action.error,
      };
      return nextState || state;
    case GET_CHARACTER_DETAILS:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case DETAILS_RECEIVED:
      // copie du state initial et ajout des details du personnage choisi
      nextState = {
        ...state,
        myCharacter: action.myCharacter,
        loading: false,
      };
      return nextState || state;
    case DETAILS_REQUEST_FAILED:
      // copie du state initial et ajout du message d'erreur
      nextState = {
        ...state,
        error: action.error,
      };
      return nextState || state;
    case GET_MORE_PAGES:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case PAGES_RECEIVED:
      // copie du state initial et ajout de la pages suplémentaire reçue
      nextState = {
        ...state,
        MoreCharacters: action.MoreCharacters,
        loading: false,
      };
      return nextState || state;
    case PAGES_REQUEST_FAILED:
      // copie du state initial et ajout du message d'erreur
      nextState = {
        ...state,
        error: action.error,
      };
      return nextState || state;
    default:
      return state;
  }
};
export default CharacterReducer;
