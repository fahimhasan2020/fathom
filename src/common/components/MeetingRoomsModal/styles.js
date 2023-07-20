import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { fullWidth, font } from '../../styles';
import { getHeightPercentage, getWidthPercentage } from '../../Helper';

const meetingRoomsModalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 0
  },
  mainContainer: {
    width: fullWidth,
    backgroundColor: colors.white,
    height: getHeightPercentage(100)
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  gradientStyles: {
    margin: 5,
    borderWidth: 1,
    borderColor: colors.lightBlueGrey,
    height: getHeightPercentage(23.1),
    width: getWidthPercentage(46),
    padding: 10
  },
  contentContainer: {
    padding: 5,
    borderRadius: 10,
    width: getWidthPercentage(14.5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    ...font(16),
    color: colors.titleTextColor,
    marginTop: 10
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerMargin: {
    marginVertical: 23
  },
  centerAligned: {
    flex: 1,
    marginLeft: 7.5
  },
  btnPadding: {
    padding: 10
  }
});

export default meetingRoomsModalStyles;
