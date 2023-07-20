import { StyleSheet } from 'react-native';
import colors from '../../../../common/Colors';
import { font } from '../../../../common/styles';
import {
  getHeightPercentage,
  getWidthPercentage,
} from '../../../../common/Helper';
const AddProjectScreenStyles = StyleSheet.create({
mainContainer: {
    flex: 1,
    backgroundColor: colors.lightWhite
},
enterPropertyContainer: {
    height: getHeightPercentage(25),
    width: getWidthPercentage(100),
    backgroundColor: colors.white,
    paddingLeft: 20,
    justifyContent: 'center',
},
listItem: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    width: getWidthPercentage(90),
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    marginBottom: 8,
    zIndex: 1,
    flexDirection:'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
placeText: {
    ...font(14,'Regular'),
    fontWeight: '400',
    color: colors.lightPurple
},
labelText: {
    ...font(18,'Regular'),
    fontWeight: '400',
    color: colors.black,
},
placeholderStyling: {
    marginTop: 10,
    ...font(14,'Regular'),
    fontWeight: '400',
    backgroundColor: colors.lightWhite,
    height: getHeightPercentage(6),
    width: getWidthPercentage(90),
    paddingLeft: 40,
    justifyContent: 'center'
},
buttonContainer: {
    width: getWidthPercentage(100),
    backgroundColor: colors.white,
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
addProjectButtonOpcity: {
    margin: 20,
    backgroundColor: colors.primary,
    height: getWidthPercentage(11),
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.5
},
buttonText: {
    ...font(12,'Bold'),
    fontWeight: '700',
    color: colors.white,
    paddingLeft: 10
},
imageIcon: {
    resizeMode: 'contain',
    height: 15,
    width: 15
},
extraText: {
    ...font(12,'Regular'),
    fontWeight: '400',
    color: colors.black,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 20
}
});
export default AddProjectScreenStyles;