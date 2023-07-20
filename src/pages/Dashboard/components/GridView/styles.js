import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';

const CameraGridStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  grayBox: {
    flex: 1,
    backgroundColor: colors.transparent,
    borderWidth: 0.5,
    borderColor: colors.lightPurple,
  },
  redBox: {
    flex: 1,
    backgroundColor: colors.transparent,
    borderWidth: 0.5,
    borderColor: colors.red,
  },
});
export default CameraGridStyles;
