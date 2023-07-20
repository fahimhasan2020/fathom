import { StyleSheet } from 'react-native';

import { getWidthPercentage, getHeightPercentage } from '../../Helper';
import colors from '../../Colors';
import { font, fullWidth } from '../../styles';

const appDrawerStyles = StyleSheet.create({
  mainScrollContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    borderColor: colors.lightWhite,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 70,
  },
  subViews: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    borderColor: colors.lightWhite,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 70,
    position: 'absolute',
    bottom: 20,
  },
  cancelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    marginRight: 15,
    height: 40,
  },
  cancelIconStyle: {
    resizeMode: 'contain',
    height: 17,
    width: 17,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  logoStyle: {
    width: '70%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 10
  },
  buttonsContainer: {
    paddingTop: 30
  },
  expandedRowsContainer: {
    backgroundColor: colors.grey
  },
  collaborateIconStyle: {
    width: 26,
    height: 14.7
  },
  iconStyle: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginLeft: 20
  },
  titleText: {
    marginLeft: 20,
    ...font(16, 'Bold')
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
  },
  versionNumbers: {
    alignSelf: 'flex-end',
    marginRight:20,
    ...font(14, 'Regular'),
    color: colors.black,
  }
});

export default appDrawerStyles;
