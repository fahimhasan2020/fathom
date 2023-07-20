import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import {
  font,
  alpha,
  getWidthPercentage,
  getHeightPercentage
} from '../../Helper';

const mainFrameStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    opacity: 0.3
  },
  notificationBanner: {
    padding: 7.5,
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: getWidthPercentage(95),
    backgroundColor: colors.white,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: alpha(colors.black, 0.4),
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.borderColorGrey,
  },
  bottomMenu: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    zIndex: 99,
    width: getWidthPercentage(98),
    flexDirection: 'row',
    padding: getHeightPercentage(2.2),
    borderWidth: 0.5,
    borderColor: colors.requestHelpBorder,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  menuText: {
    ...font(getHeightPercentage(1.45)),
    marginTop: 5,
    color: colors.dashboardTextColor
  },
  menuTextSelected: {
    ...font(getHeightPercentage(1.45)),
    marginTop: 5,
    color: colors.tealBlue
  }
});

export default mainFrameStyles;
