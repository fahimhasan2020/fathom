import { StyleSheet } from 'react-native';
import {
  font,
  getWidthPercentage,
  getHeightPercentage
} from '../../../../common/Helper';
import colors from '../../../../common/Colors';

const introPageStyle = StyleSheet.create({
  skipButtonContainer: {
    paddingLeft: 25,
  },
  nextButtonContainer: {
    paddingRight: 25,
  },
  nextButton: {
    height: getHeightPercentage(6),
    width: getWidthPercentage(22),
    borderRadius: 4,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  doneButton: {
    height: getHeightPercentage(6),
    width: getWidthPercentage(22),
    borderRadius: 4,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  nextText: {
    ...font(18, 'Bold'),
    textAlign: 'center',
    color: colors.primary,
  },
  skipButton2: {
    height: getHeightPercentage(6),
    width: getWidthPercentage(22),
    borderRadius: 4,
    backgroundColor: '#ECF4FA',
    justifyContent: 'center',
  },
  nextButton2: {
    height: getHeightPercentage(6),
    width: getWidthPercentage(22),
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  skipText2: {
    ...font(18, 'Bold'),
    textAlign: 'center',
    color: colors.primary,
  },
  nextText2: {
    ...font(18, 'Bold'),
    textAlign: 'center',
    color: colors.white,
  },

});

export default introPageStyle;
