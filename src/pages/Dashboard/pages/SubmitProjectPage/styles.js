import {StyleSheet} from 'react-native';
import colors from '../../../../common/Colors';
import {font} from '../../../../common/styles';
import {
  getHeightPercentage,
  getWidthPercentage,
} from '../../../../common/Helper';
const SubmitProjectScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainerWithOpacity: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    marginLeft: 15,
  },
  subView: {
    marginRight: 15,
  },
  totalPriceText: {
    textAlign: 'right',
    color: colors.white,
    ...font(18, 'Regular'),
  },
  dollarText: {
    textAlign: 'right',
    color: colors.white,
    ...font(30, 'Regular'),
  },
  orderDetailsText: {
    ...font(14, 'Bold'),
    color: colors.primary,
    paddingLeft: 20,
  },
  orderDetailsContainer: {
    backgroundColor: colors.white,
    height: getHeightPercentage(23),
    width: getWidthPercentage(90),
    margin: 20,
    borderRadius: 6,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: getWidthPercentage(98),
    backgroundColor: colors.white,
    height: getHeightPercentage(10),
    paddingLeft: 15,
    marginTop: 5,
    position: 'absolute',
    bottom: 0,
  },
  addProjectButton: {
    margin: 20,
    backgroundColor: colors.primary,
    height: getWidthPercentage(11),
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addProjectButtonWithOpacity: {
    margin: 20,
    backgroundColor: colors.primary,
    height: getWidthPercentage(11),
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.5,
  },
  ButtonText: {
    ...font(12, 'Bold'),
    color: colors.white,
    paddingLeft: 10,
  },
  textContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  shotsText: {
    ...font(14, 'Regular'),
    color: colors.black,
    paddingLeft: 20,
  },
  digitText: {
    ...font(14, 'Regular'),
    color: colors.black,
    paddingRight: 20,
  },
  totalPrice: {
    ...font(16, 'Bold'),
    color: colors.black,
    paddingLeft: 20,
  },
  totalDigitText: {
    ...font(16, 'Bold'),
    color: colors.black,
    paddingRight: 20,
  },
  separator: {
    borderBottomColor: colors.lightWhite,
    borderBottomWidth: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    height:
      getHeightPercentage(100) > 736
        ? getHeightPercentage(33)
        : getHeightPercentage(40),
    width: getWidthPercentage(90),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    height:
      getHeightPercentage(100) > 736
        ? getHeightPercentage(20)
        : getHeightPercentage(25),
    width: getWidthPercentage(90),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    ...font(24, 'Bold'),
    color: colors.black,
    textAlign: 'center',
    paddingTop: 20,
  },
  subtitleText: {
    ...font(14, 'Regular'),
    color: colors.black,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    height: getHeightPercentage(5),
    width: getWidthPercentage(80),
    justifyContent: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  activityContainer: {
    flex: 1,
    paddingBottom: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagesCounter: {
    ...font(15, 'Regular'),
    color: colors.black,
    textAlign: 'center',
  },
  mainView: {
    backgroundColor: colors.primary,
    height: getHeightPercentage(20),
    width: getWidthPercentage(90),
    margin: 20,
    borderRadius: 6,
  },
  propertyText: {
    ...font(16, 'Bold'),
    color: colors.white,
    paddingRight: 20,
    paddingTop: 10,
    paddingLeft: 20,
    textAlign: 'center',
    paddingBottom: 20,
  },
  textAreaContainer: {
    backgroundColor: colors.white,
    height: getHeightPercentage(13),
    width: getWidthPercentage(90),
    margin: 20,
    borderRadius: 6,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
    textAlign: 'left',
    textAlignVertical: 'top',
    shadowOpacity: 0,
    padding: 10,
    paddingTop: 10,
    color: colors.black,
  },
  messageInstructionText: {
    margin: 20,
    textAlign: 'center',
    ...font(16, 'Regular'),
    color: colors.black,
  },
});
export default SubmitProjectScreenStyles;
