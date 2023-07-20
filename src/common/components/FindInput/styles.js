import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage, getWidthPercentage } from '../../Helper';

const findInputStyles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 23,
  },
  subContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: getWidthPercentage(85),
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 10,
    borderRadius: 10
  },
  inputFieldsContainer: {
    ...font(14, 'Regular'),
    fontWeight: '400',
    borderRadius: 10,
    paddingLeft: 10,
    width: getWidthPercentage(65),
    height: getHeightPercentage(6),
    backgroundColor: colors.white,
  },
  errorTextStyle: {
    ...font(14),
    lineHeight: getHeightPercentage(3.26),
    color: 'red'
  },
  userImageIcon: {
    width: 15,
    height: 15,
    marginRight: 2.5,
  },
  iconStyles: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  }
});

export default findInputStyles;
