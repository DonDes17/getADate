import CharacterReducer from '../characterReducer';
import { getCharacters, getCharactersDetails } from '../../actions/charactersActions';

describe('CharacterReducer', () => {
  // const initialState = {};

  it('nested data on initial fetch', () => {
    // const expected = {
    //   ...initialState,
    //   loading: true
    // }
    // const actual = CharacterReducer(undefined,getCharacters());
    // expect(actual).toEqual(expected);
    expect(CharacterReducer(undefined, getCharacters())).toMatchSnapshot();
  });

  it('nested data on initial detail fetch', () => {
    // const expected = {
    //   ...initialState,
    //   loading: true
    // }
    // const actual = CharacterReducer(undefined,getCharactersDetails());
    // expect(actual).toEqual(expected);
    expect(CharacterReducer(undefined, getCharactersDetails())).toMatchSnapshot();
  });
});
