import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
import {
    getHeightPercentage,
    getWidthPercentage,
} from '../../../../common/Helper';
const ShowCapturedImagePageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    image: {
        alignSelf: 'center',
        width: '100%'
    },
    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        backgroundColor: colors.red,
        width: getHeightPercentage(8.5),
        height: getWidthPercentage(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        zIndex: 1,
        elevation: 20,
    },
    deleteButton2: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        backgroundColor: colors.red,
        width: getHeightPercentage(16),
        height: getWidthPercentage(14),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        zIndex: 1,
        elevation: 20,
    },
    keepButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: colors.green,
        width: getHeightPercentage(8.5),
        height: getWidthPercentage(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        zIndex: 1,
        elevation: 20,
    },
    keepButton2: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: colors.green,
        width: getHeightPercentage(16),
        height: getWidthPercentage(14),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        zIndex: 1,
        elevation: 20,
    },
    buttonText: {
        ...font(15, 'Bold'),
        fontWeight: '700',
        color: colors.white,
        textAlign: 'center',
        transform: [{ rotate: '90deg'}],
    },
    buttonText2: {
        ...font(15, 'Bold'),
        fontWeight: '700',
        color: colors.white,
        textAlign: 'center',
        //transform: [{ rotate: '90deg'}],
    },
});

export default ShowCapturedImagePageStyles;
