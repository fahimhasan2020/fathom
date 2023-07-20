import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import {
    font,
    getWidthPercentage,
    getHeightPercentage
  } from '../../../../common/Helper';
const WalkThroughScreen2Styles = StyleSheet.create({
mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: getWidthPercentage(97),
    resizeMode: 'contain',
    flex: 0.75,
    marginLeft: 12,
    marginTop: 20
  },
  imageContainer: {
    paddingLeft: getWidthPercentage(45),
    top: getHeightPercentage(11),
  },
  image: {
    width: getWidthPercentage(50),
    height: getHeightPercentage(12),
    resizeMode: 'cover',
    borderRadius: 5,
    alignItems: 'center',
  },
  tollTipText: {
    ...font(10, 'Regular'),
    color: colors.black,
    lineHeight: 16,
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 5
  },
  bodyText: {
    ...font(12, 'Regular'),
    paddingTop: 10,
    textAlign: 'center',
    color: colors.black,
    lineHeight: 18,
  },
  textContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: getHeightPercentage(2),
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center'
  },
});
export default WalkThroughScreen2Styles;