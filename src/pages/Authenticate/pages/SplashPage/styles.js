import { StyleSheet } from 'react-native';
import {
  font,
  fullWidth,
  fullHeight,
  getWidthPercentage,
  getHeightPercentage
} from '../../../../common/Helper';
import colors from '../../../../common/Colors';

const splashPageStyle = StyleSheet.create({
  splashContainer: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  logoWhite: {
    width: getWidthPercentage(80),
    height: fullHeight < 900 ? getHeightPercentage(10) : getHeightPercentage(15)
  },
  activityContainer: {
    flex: 1,
    paddingBottom: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInnerContainer: {
    padding: 10,
    borderRadius: 15,
    width: fullWidth - 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  popupHeaderText: {
    ...font(16, 'Bold'),
    color: colors.charcoalGrey,
    marginVertical: 10
  },
  popupInfoText: {
    ...font(14),
    color: colors.charcoalGrey,
    marginBottom: 20
  },
  popupButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: colors.borderColorGrey,
    borderTopWidth: 0.5,
    width: fullWidth - 35,
  },
  popupButtonContainer: {
    paddingVertical: 7.5,
    borderRightWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: (fullWidth - 35) / 2,
    borderRightColor: colors.borderColorGrey,
  },
  popupButtonContainerAlt: {
    paddingVertical: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: (fullWidth - 35) / 2,
  },
  popupButtonText: {
    ...font(16, 'Bold'),
    color: colors.popupButtonColor,
  },
});

export default splashPageStyle;
