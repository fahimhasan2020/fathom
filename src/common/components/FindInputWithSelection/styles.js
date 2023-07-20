import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const findInputStyles = StyleSheet.create({
  labelStyle: {
    ...font(12),
    color: colors.charcoalGrey
  },
  labelContainer: {
    paddingVertical: 5,
    justifyContent: 'flex-end',
    paddingTop: 5,
    alignItems: 'flex-start'
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    bottom: 7.5
  },
  inputContainerHeight: {
    height: getHeightPercentage(5.7)
  },
  labelTextStyle: {
    ...font(12)
  },
  inputOuterContainer: {
    paddingVertical: 7.5,
    justifyContent: 'flex-end',
    borderBottomColor: colors.lightBlueGrey,
    borderBottomWidth: 1,
    paddingBottom: 2.5
  },
  errorTextStyle: {
    ...font(14),
    lineHeight: getHeightPercentage(3.26),
    color: 'red'
  },
  morebuttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlueGrey,
    paddingTop: 10
  },
  morebuttontitleText: {
    ...font(12),
    color: colors.charcoalGrey
  },
  morebuttoninnerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 5,
    flexWrap: 'wrap'
  },
  morebuttonnullText: {
    ...font(16, 'Light'),
    color: colors.titleTextColor,
    opacity: 0.6
  },
  morebuttoncontentContainer: {
    padding: 5,
    backgroundColor: colors.selectedBg,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  morebuttonactionText: {
    ...font(14, 'Light'),
    color: colors.charcoalGrey
  },
  imageStyle: {
    marginLeft: 5,
    padding: 5,
    width: 8.9,
    height: 8.9
  },
  crossButton: {
    padding: getHeightPercentage(1.35)
  },
  rowPart: {
   justifyContent: 'flex-end'
  }
});

export default findInputStyles;
