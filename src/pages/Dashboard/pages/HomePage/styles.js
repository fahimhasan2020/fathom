import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
import {
    getHeightPercentage,
    getWidthPercentage,
} from '../../../../common/Helper';

const dashboardScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.lightWhite
    },
    textContainer: {
        width: getWidthPercentage(100),
        backgroundColor: colors.ligthGreyBlue,
        height: getHeightPercentage(4),
        justifyContent: 'center',
    },
    reviewText: {
        ...font(12, 'Regular'),
        color: colors.lightPurple,
        paddingLeft: 20
    },
    buttonContainer: {
        width: getWidthPercentage(98),
        backgroundColor: colors.white,
        height: getHeightPercentage(10),
        paddingLeft: 15,
        position: 'absolute',
        bottom: 0,
    },
    addProjectButton: {
        margin: 20,
        backgroundColor: colors.primary,
        height: getWidthPercentage(11),
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: "#445f94",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 8,
    },
    ButtonText: {
        ...font(14, 'Bold'),
        color: colors.white,
        paddingLeft: 10
    },
    iconItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItem: {
        backgroundColor: colors.white,
        paddingVertical: 15,
        width: getWidthPercentage(90),
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingRight: 70,
        borderRadius: 6,
        borderBottomColor: colors.white,
        borderBottomWidth: 2,
        marginBottom: 8,
    },
    label: {
        ...font(14, 'Regular'),
        color: colors.black,
        paddingLeft: 10,
        marginRight: 40,
    },
    text: {
        ...font(12, 'Regular'),
        color: colors.black,
        paddingLeft: 10
    },
    subImages: {
        width: '15%',
        height: 50,
        resizeMode: 'cover',
        borderRadius: 5
    },
    NoProjectContainer: {
        justifyContent: 'center',
        flex: 1
    },
    noProjectText: {
        textAlign: 'center',
        ...font(18, 'Bold'),
        color: colors.black,
        marginLeft: 20,
        marginRight: 20
    },
    trashContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: 'white',
    elevation: 2, // Android
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: 80,
    right: 35,
    top: 20
    },
    trashStyles: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageIcon: {
        resizeMode: 'contain',
        height: 15,
        width: 15
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
    titleText: {
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
    },
    linkText: {
        ...font(18, 'Bold'),
        color: colors.primary,

    }
});

export default dashboardScreenStyles;
