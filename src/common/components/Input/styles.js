import { StyleSheet } from 'react-native';

import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const inputStyles = StyleSheet.create({
  mainContainer: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 25
  },
  noPadding: {
    height: 70,
    flexDirection: 'row'
  },
  containerHeight: {
    height: getHeightPercentage(5.7)
  },
  labelStyle: {
    ...font(12)
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 13,
    alignItems: 'flex-start'
  },
  textFieldContainer: {
    flex: 9
  }
});

export default inputStyles;
