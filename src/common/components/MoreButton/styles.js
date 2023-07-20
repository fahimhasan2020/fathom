import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const morebuttonStyles = StyleSheet.create({
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
    padding: 5,
    flexWrap: 'wrap'
  },
  morebuttonnullText: {
    ...font(16, 'Light'),
    color: colors.titleTextColor,
    opacity: 0.6
  },
  morebuttoncontentContainer: {
    padding: 5,
    backgroundColor: colors.selectedBg,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  morebuttonactionText: {
    ...font(14, 'Light'),
    color: colors.charcoalGrey
  },
  imageStyle: {
    marginLeft: 5,
    padding: 5,
    width: 8.9,
    height: 8.9
  },
  crossButton: {
    padding: 10
  },
  userImageIcon: {
    width: 15,
    height: 15,
    marginRight: 2.5
  },
  errorTextStyle: {
    ...font(14),
    lineHeight: getHeightPercentage(3.26),
    color: 'red'
  },
});

export default morebuttonStyles;
