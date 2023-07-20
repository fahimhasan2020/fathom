import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const findInputMaskStyles = StyleSheet.create({
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
  inputOuterContainer: {
    flex: 1,
    borderBottomColor: colors.lightBlueGrey,
    borderBottomWidth: 1
  },
  inputOuterContainerAlt: {
    flex: 1,
    justifyContent: 'flex-end',
    borderBottomColor: colors.lightBlueGrey,
    borderBottomWidth: 1
  },
  errorTextStyle: {
    ...font(14),
    lineHeight: getHeightPercentage(3.26),
    color: 'red'
  }
});

export default findInputMaskStyles;
