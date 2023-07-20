
import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
const PrivacyScreenStyles = StyleSheet.create({
mainContainer: {
  flex: 1,
},
text: {
  textAlign: 'left',
  ...font(14,'Regular'),
  color: colors.black,
  paddingLeft: 40,
  paddingRight: 30,
  paddingTop: 70,
  lineHeight: 30,
},
textHead: {
  textAlign: 'left',
  ...font(16,'bold'),
  fontWeight: 'bold',
  color: colors.black,
  paddingLeft: 40,
  paddingRight: 30,
  paddingTop: 20,
  lineHeight: 30,
}
})
export default PrivacyScreenStyles;