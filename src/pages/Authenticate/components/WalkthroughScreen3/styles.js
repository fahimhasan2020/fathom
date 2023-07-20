import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import {
    font,
    getWidthPercentage,
    getHeightPercentage
  } from '../../../../common/Helper';

const WalkThroughScreen3Styles = StyleSheet.create({
  backgroundImage: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(100),
    resizeMode: 'cover',
    flex: 1,
},
lightContainer: {
  paddingTop: getHeightPercentage(19.5),
  paddingLeft: 70,
  paddingRight: 70,
},
title: {
  ...font(20, 'Bold'),
  textAlign: 'center',
  color: colors.white,
},
bodyText: {
  ...font(14, 'Regular'),
  paddingTop: 10,
  textAlign: 'center',
  color: colors.white,
  lineHeight: 18,
},
line: {
  alignSelf: 'center',
  borderBottomColor: colors.white,
  borderBottomWidth: 1,
  width: getWidthPercentage(70),
  paddingTop: getHeightPercentage(4),
  borderRadius: 5,

},
fansContainer: {
  alignItems: 'center',
  paddingTop: 30,
  paddingLeft: 70,
  paddingRight: 70,
},

});
export default WalkThroughScreen3Styles;