import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EAA70',
    height: Platform.OS == 'ios' ? 120 : 80,
    marginTop: Platform.OS == 'android' ? 0 : 0
  },
  componentsContainer: {
    paddingTop: Platform.OS == 'ios' ? 55 : 0,
    flexDirection: 'row',
    flex: 1
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 120
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff'
  }
});
