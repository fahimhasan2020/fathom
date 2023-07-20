import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const findTextStyles = StyleSheet.create({
  innerContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  innerContainerAlt: {
    justifyContent: 'space-between',
    paddingTop: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  labelStyle: {
    ...font(14),
    color: colors.charcoalGrey
  },
  moreIconStyle: {
    width: 12,
    height: 7.4
  },
  inputContainerHeight: {
    flex: 1,
    borderColor: colors.lightBlueGrey,
    borderWidth: 1
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25
  },
  toggleImage: {
    width: 14.6,
    height: 14.6,
    marginRight: 5
  },
  labelTextStyle: {
    ...font(12),
    color: colors.charcoalGrey
  },
  attachImage: {
    width: 11.7,
    height: 14.6,
    marginRight: 5
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    ...font(14),
    lineHeight: getHeightPercentage(3.26),
    color: 'red'
  },
  suggestionsText: {
    ...font(14),
    padding: 2.5,
    lineHeight: getHeightPercentage(3.26),
    color: colors.charcoalGrey
  },
  moreText: {
    ...font(12, 'Italic'),
    color: colors.tealBlue
  },
  expandBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  errorContainer: {
    flex: 0.25
  },
  suggestionConatiner: {
    flex: 0.35,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColorGrey,
    justifyContent: 'center'
  },
  infoText: {
    ...font(10, 'Light'),
    color: colors.infoText
  },
  labelInfoText: {
    ...font(12, 'Italic'),
    marginBottom: 10,
    color: colors.charcoalGrey
  }
});

export default findTextStyles;
