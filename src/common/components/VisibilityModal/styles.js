import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font, fullWidth } from '../../styles';
import { getHeightPercentage } from '../../Helper';

const visibilityModalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 0
  },
  innerContainer: {
    width: fullWidth,
    backgroundColor: colors.white,
    height: getHeightPercentage(28),
    padding: 18
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleText: {
    ...font(18),
    color: colors.titleTextColor
  },
  closeText: {
    ...font(14),
    color: colors.titleTextColor
  },
  optionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: colors.modalOptionBorder,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  checkboxContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row'
  },
  optionText: {
    ...font(14, 'Light'),
    paddingHorizontal: 20,
    color: colors.charcoalGrey
  },
  headerOptionText: {
    ...font(18, 'Light'),
    color: colors.charcoalGrey
  },
  checkboxIcon: {
    width: 14,
    height: 14
  },
  checkBoxInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginLeft: 20
  }
});

export default visibilityModalStyles;
