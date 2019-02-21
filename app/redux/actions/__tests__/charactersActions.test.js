import { getCharacters, getCharactersDetails } from '../charactersActions';


describe('CharactersActions', () => {
  it('checking formatted action', () => {
    // const expected = { type: 'GET_CHARACTERS' };
    // const actual = getCharacters();
    // expect(expected).toEqual(actual);
    expect(getCharacters()).toMatchSnapshot();
  });

  it('checking if the action is well formatted', () => {
    const id = 2;
    // const expected = { type: 'GET_CHARACTER_DETAILS', id };
    // const actual = getCharactersDetails(id);
    // expect(expected).toEqual(actual);
    expect(getCharactersDetails(id)).toMatchSnapshot();
  });
});
