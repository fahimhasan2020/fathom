import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const findTextSimpleStyles = StyleSheet.create({
  mainContainer: {
    height: getHeightPercentage(23),
    paddingHorizontal: 25
  },
  innerContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  labelTextStyle: {
    ...font(12),
    color: colors.charcoalGrey
  },
  inputContainer: {
    flex: 1,
    borderColor: colors.lightBlueGrey,
    borderWidth: 1
  },
  errorText: {
    ...font(14),
    lineHeight: getHeightPercentage(3.26),
    color: 'red'
  },
  errorContainer: {
    flex: 0.25
  }
});

export default findTextSimpleStyles;
