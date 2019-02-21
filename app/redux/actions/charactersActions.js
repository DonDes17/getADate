import {
  GET_CHARACTERS,
  GET_CHARACTER_DETAILS,
  GET_MORE_PAGES,
} from '../constants';

// Action creator pour récupérer les personnages
export const getCharacters = () => ({ type: GET_CHARACTERS });

// Action creator pour récupérer une page supplémentaire
export const getMorePages = page => ({ type: GET_MORE_PAGES, page });

// Action creator pour récupérer les datails d'un personnage
export const getCharactersDetails = id => ({ type: GET_CHARACTER_DETAILS, id });
