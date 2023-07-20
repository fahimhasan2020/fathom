import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage, getWidthPercentage } from '../../Helper';

const halfSelectStyles = StyleSheet.create({
  mainContainer: {
    width: getWidthPercentage(50),
    height: getHeightPercentage(9),
    flexDirection: 'row',
    paddingHorizontal: 25
  },
  labelStyle: {
    ...font(12),
    color: colors.charcoalGrey
  },
  containerHeight: {
    height: getHeightPercentage(5.7)
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    justifyContent: 'flex-end',
    paddingTop: 30,
    alignItems: 'flex-end'
  }
});

export default halfSelectStyles;
