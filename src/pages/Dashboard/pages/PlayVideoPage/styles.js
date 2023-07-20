
import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
import {
  getHeightPercentage, getWidthPercentage
} from '../../../../common/Helper';
const PlayVideoPageStyles = StyleSheet.create({
mainContainer: {
  flex: 1,
},
backgroundVideo: {
  width: getWidthPercentage(100),
  height: getHeightPercentage(100) > 736
  ? getHeightPercentage(85)
  : getHeightPercentage(90),
  backgroundColor: colors.black,
},
})
export default PlayVideoPageStyles;