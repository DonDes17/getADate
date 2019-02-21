import { runSaga } from 'redux-saga';
import { fetchCharacters, fetchCharacterDetails } from '../characterSagas';


describe('CharacterSagas', () => {
  const initalState = {};

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('checking characters fetch result', async () => {
    const expectedResult = [{ name: '', status: '', image: '' }, {}];
    fetch.mockResponseOnce(JSON.stringify(expectedResult));

    const dispatched = [];
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({ ...initalState }),
      },
      fetchCharacters,
    ).done;

    expect(dispatched).toEqual([{ type: 'CHARACTERS_RECEIVED', characters: expectedResult.results }]);
    expect(fetch).toHaveBeenCalled();
  });


  it('checking charactersDetails fetch result', async () => {
    const expectedResult = { name: '', status: '', image: '' };
    fetch.mockResponseOnce(JSON.stringify(expectedResult));
    const id = 2;
    const dispatched = [];
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({ ...initalState }),
      },
      fetchCharacterDetails,
      id,

    ).done;

    expect(dispatched).toEqual([{ type: 'DETAILS_RECEIVED', myCharacter: expectedResult }]);
    expect(fetch).toHaveBeenCalled();
  });
});
