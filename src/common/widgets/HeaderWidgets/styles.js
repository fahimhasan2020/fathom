import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font, fullWidth } from '../../styles';
import { getHeightPercentage } from '../../Helper';

export const headerComponentStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: fullWidth,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 25
  }
});

export const navBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: fullWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  innerContainer: {
    position: 'absolute',
    left: 12,
    padding: 10
  },
  titleText: {
    ...font(17, 'Light'),
    textAlign: 'center',
    color: colors.white,
    paddingBottom: 12
  },
  iconOneContainer: {
    position: 'absolute',
    right: 50,
    padding: 10
  },
  iconTwoContainer: {
    position: 'absolute',
    right: 12,
    padding: 10,
    flexDirection: 'row'
  },
  notificationText: {
    ...font(13, 'Bold'),
    color: colors.coralPink
  }
});

export const headerComponentTwoStyle = StyleSheet.create({
  container: {
    height: getHeightPercentage(10),
    flexDirection: 'row',
    width: fullWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25
  }
});

export const headerComponentThreeStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: fullWidth,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 22
  },
  failTitle: {
    ...font(18, 'Light'),
    lineHeight: getHeightPercentage(3.26),
    color: colors.coralPink,
    marginLeft: 10
  },
  boldFont: {
    ...font(18, 'Bold'),
    lineHeight: getHeightPercentage(3.26),
    textAlign: 'left',
    alignSelf: 'flex-end',
    color: colors.titleTextColor
  },
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  closeImage: {
    width: 28,
    height: 28,
    alignSelf: 'center'
  }
});

export const headerBarComponentStyle = StyleSheet.create({
  container: {
    height:
      getHeightPercentage(100) > 736
        ? getHeightPercentage(8)
        : getHeightPercentage(8),
    flexDirection: 'row',
    width: fullWidth,
    backgroundColor: colors.white,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomColor: colors.lightPurple,
    borderBottomWidth: 0.4,
  },
  innerContainer: {
    position: 'absolute',
    left: 2,
    padding: 10,
  },
  imageIcon: {
    resizeMode: 'contain',
    height: 30,
    width: 30
  },
  imageBackIcon: {
    resizeMode: 'contain',
    height: 20,
    width: 20
  },
  titleText: {
    ...font(18),
    textAlign: 'center',
    color: colors.black,
    textTransform: 'capitalize',
    paddingBottom: getHeightPercentage(1),
    letterSpacing: 1,
  },
  searchContainer: {
    position: 'absolute',
    right: 2,
    padding: 10
  },
  rightButtonText: {
    position: 'absolute',
    right: 2,
    padding: 10,
    color: colors.primary
  },
  searchBtnTitle: {
    ...font(17, 'Light'),
    color: colors.white,
    lineHeight: getHeightPercentage(2.98)
  }
});

export const headerBarWithBackComponentStyle = StyleSheet.create({
  container: {
    height:
      getHeightPercentage(100) > 736
        ? getHeightPercentage(4)
        : getHeightPercentage(6),
    flexDirection: 'row',
    width: fullWidth,
    backgroundColor: colors.tealBlue,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  gobackContainer: {
    position: 'absolute',
    left: 12,
    zIndex: 99
  },
  // imageIcon: {
  //   resizeMode: 'contain',
  //   height: 35,
  //   width: 35
  // },
  gobackTitle: {
    ...font(17, 'Light'),
    textAlign: 'center',
    color: colors.white,
    lineHeight: getHeightPercentage(2.98),
    paddingBottom: 12
  },
  titleText: {
    ...font(18),
    textAlign: 'center',
    color: colors.black,
    textTransform: 'capitalize',
    paddingBottom: getHeightPercentage(1),
    letterSpacing: 1.5
  },
  saveBtnContainer: {
    position: 'absolute',
    right: 12
  },
  saveBtnTitle: {
    ...font(17, 'Light'),
    textAlign: 'center',
    color: colors.white,
    lineHeight: getHeightPercentage(2.98),
    paddingBottom: 12
  }
});
