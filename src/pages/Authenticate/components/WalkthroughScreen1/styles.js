import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import {
    font,
    getWidthPercentage,
    getHeightPercentage
  } from '../../../../common/Helper';
const WalkThroughScreen1Styles = StyleSheet.create({
    image: {
        width: getWidthPercentage(100),
        height: getHeightPercentage(100),
        resizeMode: 'contain',
        flex: 1
    },
    lightContainer: {
        alignItems: 'center',
        paddingTop: getHeightPercentage(15),
        paddingLeft: 70,
        paddingRight: 70,
    },
    fansContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 70,
        paddingRight: 70,
    },
    title: {
        ...font(20, 'Bold'),
        textAlign: 'center',
        color: colors.white,
    },
    pagetitle: {
        ...font(28, 'Bold'),
        textAlign: 'center',
        color: colors.white,
        marginBottom: 20
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
        paddingTop: getHeightPercentage(2),
        
        borderRadius: 5,
    },
    lighContainer: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 200,
        paddingLeft: 70,
        paddingRight: 70,
    },
    distortationContainer: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 25,
        paddingLeft: 70,
        paddingRight: 70,
    },
  });
  export default WalkThroughScreen1Styles