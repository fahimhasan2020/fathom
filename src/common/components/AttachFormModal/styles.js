import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { fullWidth } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const attachFormModalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 0
  },
  innerContainer: {
    width: fullWidth,
    backgroundColor: colors.white,
    height: getHeightPercentage(100)
  },
  checkboxIcon: {
    width: 14,
    height: 14
  },
  eyeIcon: {
    width: 22,
    height: 15
  },
  listCheckBox: {
    flex: 2,
    paddingVertical: 10,
    justifyContent: 'flex-start'
  },
  showIconContainer: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'flex-end'
  }
});

export default attachFormModalStyles;
