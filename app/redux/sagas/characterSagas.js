import { put, takeLatest, call } from 'redux-saga/effects';
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

const getLatestCharacters = () => fetch('https://rickandmortyapi.com/api/character'); // requête fetch pour le tableau de personnages

export function* fetchCharacters() {
  try {
    let myCharacters;
    let allResult;
    const response = yield call(getLatestCharacters); // Appel de l'API
    const result = yield response.json(); // réponse de l'API

    if (result.error) {
      // en cas d'erreur , on ajoute ce message via l'action CHARACTERS_REQUEST_FAILED
      yield put({ type: CHARACTERS_REQUEST_FAILED, error: result.error });
    } else {
      allResult = result.info; // récupération des infos générales (nombre de pages etc...)
      myCharacters = result.results; // récupération du tableau de personnages

      // Ajout des personnages et infos générales via l'action CHARACTERS_RECEIVED
      yield put({ type: CHARACTERS_RECEIVED, characters: myCharacters, info: allResult });
    }
  } catch (error) {
    yield put({ type: CHARACTERS_REQUEST_FAILED, error: error.message });
  }
}

const getLatestDetails = id => fetch(`https://rickandmortyapi.com/api/character/${id}`); // requête fetch pour les détailes d'un personnage

export function* fetchCharacterDetails({ id }) {
  try {
    let myCharacter;
    const response = yield call(getLatestDetails, id); // Appel de l'API
    const result = yield response.json(); // réponse de l'API

    if (result.error) {
      // en cas d'erreur , on ajoute ce message via l'action DETAILS_REQUEST_FAILED
      yield put({ type: DETAILS_REQUEST_FAILED, error: result.error });
    } else {
      myCharacter = result; // récupération des détails du personnages

      // Ajout des détails du personnages via l'action DETAILS_RECEIVED
      yield put({ type: DETAILS_RECEIVED, myCharacter });
    }
  } catch (error) {
    yield put({ type: DETAILS_REQUEST_FAILED, error: error.message });
  }
}

const getLatestPage = page => fetch(`https://rickandmortyapi.com/api/character/?page=${page}`); // requête fetch pour charger une page supplémentaire

export function* fetchMorePages({ page }) {
  try {
    let MoreCharacters;
    const response = yield call(getLatestPage, page); // Appel de l'API
    const result = yield response.json(); // réponse de l'API

    if (result.error) {
      // en cas d'erreur , on ajoute ce message via l'action PAGES_REQUEST_FAILED
      yield put({ type: PAGES_REQUEST_FAILED, error: result.error });
    } else {
      MoreCharacters = result.results; // récupération du tableau de personnages

      // Ajout des personnages et infos générales via l'action PAGES_RECEIVED
      yield put({ type: PAGES_RECEIVED, MoreCharacters });
    }
  } catch (error) {
    yield put({ type: PAGES_REQUEST_FAILED, error: error.message });
  }
}

function* actionWatcher() {
  /*
   takeLatest Génère une saga sur chaque action envoyée au store qui correspond au modèle.
   Annule automatiquement toute tâche de saga précédente lancée précédemment si elle est
   toujours en cours d'exécution.
  */
  yield takeLatest(GET_CHARACTERS, fetchCharacters);
  yield takeLatest(GET_CHARACTER_DETAILS, fetchCharacterDetails);
  yield takeLatest(GET_MORE_PAGES, fetchMorePages);
}

export default function* rootSaga() {
  yield call(actionWatcher);
}
