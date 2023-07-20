
import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
import {
  getHeightPercentage,
  getWidthPercentage,
} from '../../../../common/Helper';
const ContactScreenStyles = StyleSheet.create({
mainContainer: {
  flex: 1,
},
text: {
  textAlign: 'center',
  ...font(15,'Regular'),
  fontWeight: '600',
  color: colors.black,
  paddingLeft: 40,
  paddingRight: 30,
  paddingTop: 20
},
supportImage: {
  resizeMode: 'contain',
  height: 250,
  width: 250,
  marginTop: 100,
  alignSelf: 'center'
},
buttonStyles: {
  margin: 40,
  backgroundColor: colors.primary,
  height: getWidthPercentage(14),
  borderRadius: 4,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center'
},
emailText: {
  ...font(15,'Regular'),
  fontWeight: '600',
  color: colors.white,
}
})
export default ContactScreenStyles;