import { StyleSheet } from 'react-native';

import { font } from '../../styles';
// import { getHeightPercentage } from '../../Helper';

const selectStyles = StyleSheet.create({
  mainContainer: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 25
  },
  noPadding: {
    height: 70,
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 13,
    alignItems: 'flex-start'
  },
  containerHeight: {
    // height: getHeightPercentage(5.7),
    paddingRight: 15
  },
  labelStyle: {
    ...font(12)
  },
  secondIconContainer: {
    position: 'absolute',
    right: 5,
    justifyContent: 'flex-end',
    paddingTop: 30,
    alignItems: 'flex-end'
  },
  textFieldContainer: {
    flex: 9
  }
});

export default selectStyles;
