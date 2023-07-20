import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';

const morebuttonStyles = StyleSheet.create({
  addGuestsMainContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  morebuttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlueGrey,
    paddingTop: 10
  },
  morebuttontitleText: {
    ...font(12),
    color: colors.charcoalGrey
  },
  morebuttoninnerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 5,
    flexWrap: 'wrap'
  },
  morebuttonnullText: {
    ...font(16, 'Light'),
    color: colors.titleTextColor,
    opacity: 0.6
  },
  guestsList: {
    flexDirection: 'row',
    paddingTop: 20,
    flexWrap: 'wrap'
  },
  morebuttoncontentContainer: {
    padding: 5,
    // backgroundColor: colors.selectedBg,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  morebuttonactionText: {
    ...font(14, 'Bold'),
    color: colors.serviceTabBg,
    paddingLeft: 10
  },
  statusImage: {
    // marginLeft: 5,
    // padding: 5,
    width: 15,
    height: 15
  },
  infoImage: {
    width: 30,
    height: 30
  },
  imageStyle: {
    marginLeft: 5,
    padding: 5,
    width: 8.9,
    height: 8.9
  },
  crossButton: {
    padding: 7
  }
});

export default morebuttonStyles;
