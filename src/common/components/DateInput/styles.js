import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const dateInputStyles = StyleSheet.create({
  mainContainer: {
    height: getHeightPercentage(9),
    marginHorizontal: 25,
    borderBottomColor: colors.grey,
    borderBottomWidth: 2
  },
  labelStyle: {
    ...font(12),
    color: colors.charcoalGrey
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
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
  errorTextStyle: {
    ...font(14),
    lineHeight: getHeightPercentage(3.26),
    color: 'red'
  },
});

export default dateInputStyles;
