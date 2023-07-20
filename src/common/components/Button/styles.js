import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { getHeightPercentage, getWidthPercentage } from '../../Helper';

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    marginLeft: 23,
    marginTop: getHeightPercentage(4.0),
    height: getHeightPercentage(6.5),
    width: getWidthPercentage(86),
    justifyContent: 'center',
    borderRadius: 4

  },
});

export default buttonStyles;
