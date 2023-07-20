import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
import {
    getHeightPercentage,
    getWidthPercentage,
} from '../../../../common/Helper';
import { color } from 'react-native-reanimated';
const ViewProjectScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.lightWhite
    },

    subContainer: {
        backgroundColor: colors.white,
        marginTop: 20,
        width: getWidthPercentage(100),
        height: getWidthPercentage(60),
    },
    label: {
        ...font(14, 'Regular'),
        color: '#000000',
        paddingLeft: 15,
        fontWeight: '400',
        marginTop: 10
    },
    text: {
        ...font(12, 'Regular'),
        color: '#000000',
        paddingLeft: 15,
    },
    mainImage: {
        width: getWidthPercentage(95),
        height: getWidthPercentage(45),
        alignSelf: 'center',
        borderRadius: 5,
        resizeMode: 'cover'
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    subImages: {
        width: getWidthPercentage(31),
        height: getWidthPercentage(35),
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        resizeMode: 'cover',
        marginTop: 10,
        marginHorizontal: 2,
        marginLeft: 5
    },
    addMoreProjectButton: {
        width: getWidthPercentage(31),
        height: getWidthPercentage(35),
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 2,
        marginLeft: 5,
        backgroundColor: colors.primary,
        alignContent: 'center',
        justifyContent: 'center'
    },
    addMoreProjectButton2: {
        width: getWidthPercentage(31),
        height: getWidthPercentage(35),
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 2,
        marginLeft: 5,
        backgroundColor: colors.primary,
        //alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    icon: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: 20,
        width: 20,
        marginBottom: 10,
    },
    checkBoxStyling: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 5,
        alignSelf: 'flex-end'
    },
    subImages2: {
        width: getWidthPercentage(31),
        height: getWidthPercentage(35),
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        resizeMode: 'cover',
        marginTop: 10,
        marginHorizontal: 2,
        marginLeft: 5,
        opacity: 0.3
    },
    showImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        elevation: 60
    },
    onOpeningImage: {
        height: '100%',
        width: '100%'
    },
    buttonContainer: {
        width: getWidthPercentage(98),
        backgroundColor: colors.white,
        height: getHeightPercentage(10),
        paddingLeft: 15,
        marginTop: 5
    },
    addProjectButton: {
        margin: 20,
        backgroundColor: colors.primary,
        height: getWidthPercentage(11),
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    addProjectButtonWithOpacity: {
        margin: 20,
        backgroundColor: colors.primary,
        height: getWidthPercentage(11),
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        opacity: 0.5
    },
    ButtonText: {
        ...font(12, 'Bold'),
        color: colors.white,
        paddingLeft: 10
    },
    deleteContainer: {
        position: 'absolute',
        bottom: 4,
        backgroundColor: colors.lightBlue,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: getHeightPercentage(7),
        width: getWidthPercentage(100),
        alignItems: 'center'
    },
    deletionText: {
        color: '#000000',
        fontSize: 16,
        marginLeft: 20
    },
    moreImagesText: {
        color: colors.white,
        textAlign: 'center'
    },
    trashStyles: {
        marginRight: 20,
        resizeMode: 'contain',
        height: 20
    },
    mainMoadl: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    modalSubView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        height: getHeightPercentage(100) > 736
            ? getHeightPercentage(22.5)
            : getHeightPercentage(25.5),
        width: getWidthPercentage(90),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titleViewStyle: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitleText: {
        ...font(20, 'Bold'),
        color: colors.white,
        textAlign: 'center',
    },
    separator: {
        borderColor: colors.lightWhite,
        borderWidth: 0.8,
        width: '100%'
    },
    subtitleText: {
        ...font(17, 'Regular'),
        color: colors.black,
        padding: 10,
        paddingTop: 25,
        paddingBottom: 25
    },
    modalButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    modalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 33,
        width: 100,
        marginRight: 12,
        backgroundColor: colors.primary,
        borderRadius: 4
    },
    modalButtonText: {
        ...font(16, 'Regular'),
        color: colors.white,
    }
});
export default ViewProjectScreenStyles;