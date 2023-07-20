import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
import {
    getHeightPercentage,
    getWidthPercentage,
} from '../../../../common/Helper';

const CameraPageStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomBarContainer: {
        position: 'absolute',
        width: '100%',
        height: getHeightPercentage(15),
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        opacity: 0.3,
        padding: 10
    },
    topBarContainer: {
        position: 'absolute',
        width: '100%',
        height: getHeightPercentage(8),
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        opacity: 0.3,
        padding: 10
    },
    snapButtonContainer: {
        position: 'absolute',
        bottom: getHeightPercentage(2.5),
        alignSelf: 'center'
    },
    doneButton: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        backgroundColor: colors.primary,
        width: getHeightPercentage(6),
        height: getWidthPercentage(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        zIndex: 1,
        elevation: 20,
    },
    doneText: {
        ...font(15, 'Bold'),
        fontWeight: '700',
        color: colors.white,
        textAlign: 'center',
        transform: [{ rotate: '90deg'}]
    },
    doneButtonAlt: {
        position: 'absolute',
        bottom: getHeightPercentage(4),
        right: 10,
        backgroundColor: colors.primary,
        height: getHeightPercentage(6),
        width: getWidthPercentage(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        zIndex: 1,
        elevation: 20,
    },
    doneTextAlt: {
        ...font(15, 'Bold'),
        fontWeight: '700',
        color: colors.white,
        textAlign: 'center',
    },
    gridButton: {
        position: 'absolute',
        top: getHeightPercentage(2),
        right: 10,
        padding: 10
    },
    btnDisabled: {
        opacity: 0.3
    },
    buttonEnabled: {
        opacity: 0
    },
    cameraTypesContainer: {
        position: 'absolute',
        top: getHeightPercentage(2),
        left: 10,
        padding: 10,
        flexDirection: 'row'
    },
    cameraIdText: {
        ...font(14),
        color: colors.white,
        marginHorizontal: 5,
    },
});

export default CameraPageStyles;
