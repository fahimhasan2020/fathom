import { StyleSheet } from 'react-native';
import {
  fullHeight,
  getWidthPercentage,
  getHeightPercentage
} from '../../../../common/Helper';

const landingPageStyle = StyleSheet.create({
  logoContainer: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonsContainer: {
    flex: 1,
    paddingBottom: 80,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  logoWhite: {
    width: getWidthPercentage(80),
    height: fullHeight < 900 ? getHeightPercentage(10) : getHeightPercentage(15)
  },
});
export default landingPageStyle;
