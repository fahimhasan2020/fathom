import { StyleSheet } from 'react-native';

import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const inputPlainStyles = StyleSheet.create({
  containerHeight: {
    height: getHeightPercentage(5.7)
  },
  labelStyle: {
    ...font(12)
  }
});

export default inputPlainStyles;
