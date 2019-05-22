import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  item_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.75,
    borderColor: '$primaryColor',
  },
  content_container: {
    flex: 1,
    marginLeft: '10%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: '$lightBG',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '$lightBG',
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  status: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '$secondaryColor',
  },
});
