import { StyleSheet, Dimensions , Platform } from 'react-native';

import colors from './Colors';
import {
  alpha,
  getWidthPercentage,
  getHeightPercentage,
  getResponsiveFont
} from './Helper';

export const { width: fullWidth, height: fullHeight } = Dimensions.get(
  'window'
);
// console.log(fullWidth, fullHeight);
export const font = (fontSize, fontWeight = '', fontFamily = 'Roboto') => ({
  fontSize: getResponsiveFont(fontSize),
  fontFamily: fontWeight ? `${fontFamily}-${fontWeight}` : `${fontFamily}`,
});

export const behaviour = Platform.select({ ios: 'padding', android: null });

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flexOneContainer: {
    flex: 1
  },
  marginTop: {
    marginTop: 23
  },
  marginTwoFive: {
    margin: 2.5
  },
  fullWidth: {
    width: fullWidth
  },
  transparentBackground: {
    width: fullWidth,
    backgroundColor: 'transparent'
  },
  transparentBackgroundOpacity: {
    opacity: 0.3,
    width: fullWidth,
    backgroundColor: 'transparent'
  },
  rowFlex: {
    flexDirection: 'row'
  },
  togglePadding: {
    paddingLeft: 10,
    paddingTop: 2
  },
  checkbox: {
    width: 20,
    height: 20,
    alignSelf: 'center'
  },
  buttonWhite: {
    height: getHeightPercentage(5.29),
    width: getWidthPercentage(88),
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: colors.borderColorGrey,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonWhiteAlt: {
    height: getHeightPercentage(5.29),
    width: getWidthPercentage(88),
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  buttonText: {
    ...font(14),
    textAlign: 'left',
    lineHeight: getHeightPercentage(2.71),
    color: colors.charcoalGrey
  },
  buttonTextWhite: {
    ...font(14),
    textAlign: 'left',
    lineHeight: getHeightPercentage(2.71),
    color: colors.white
  },
  tealBlueBtn: {
    height: getHeightPercentage(5.29),
    width: getWidthPercentage(88),
    backgroundColor: colors.tealBlue,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  tealBlueBtnText: {
    ...font(14),
    textAlign: 'center',
    lineHeight: getHeightPercentage(2.71),
    color: colors.white
  },
  navyBlueBtn: {
    height: getHeightPercentage(5.29),
    width: getWidthPercentage(95),
    backgroundColor: colors.navyBlue,
    borderRadius: getHeightPercentage(2.645),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30
  },
  navyBlueBtnText: {
    ...font(14, 'Bold'),
    textAlign: 'center',
    lineHeight: getHeightPercentage(2.71),
    color: colors.white
  },
  replyIcon: {
    width: 18,
    height: 15,
    marginRight: 7.5
  },
  likeIcon: {
    width: 18.7,
    height: 17,
    marginRight: 7.5
  },
  likeIconAlt: {
    width: 22,
    height: 20,
    marginRight: 7.5
  },
  textFieldIcon: {
    alignSelf: 'flex-start'
  },
  badgeIcon: {
    width: 18,
    height: 20,
  },
  domainIcon: {
    height: 18,
    width: 20,
  },
  placeIcon: {
    width: 14,
    height: 20,
  },
  dialPadIcon: {
    width: 16,
    height: 22,
  },
  formaIcon: {
    width: 21.3,
    height: 20,
  },
  emailIcon: {
    width: 20,
    height: 16,
  },
  expandIcon: {
    width: 12,
    height: 7.4,
    position: 'absolute',
    bottom: -25,
    right: 0
  },
  expandIconHorizontal: {
    width: 7.4,
    height: 12
  },
  expandIconAlt: {
    width: 12,
    height: 7.4
  },
  backIcon: {
    alignSelf: 'center'
  },
  menuIcon: {
    alignSelf: 'center'
  },
  backTitle: {
    ...font(18, 'Light'),
    lineHeight: getHeightPercentage(3.26),
    textAlign: 'left',
    alignSelf: 'flex-end',
    color: colors.titleTextColor
  },
  nextTitle: {
    ...font(14, 'Light'),
    lineHeight: getHeightPercentage(2.58),
    textAlign: 'left',
    alignSelf: 'flex-end',
    color: colors.titleTextColor
  },
  inputStyle: {
    ...font(16, 'Light'),
    color: colors.charcoalGrey,
    padding: 0
  },
  textAreaInputStyle: {
    height: getHeightPercentage(10),
    ...font(16, 'Light'),
    color: colors.charcoalGrey,
    padding: 5,
    margin: 0,
    paddingVertical: 0,
    textAlignVertical: 'top'
  },
  postContainer: {
    backgroundColor: colors.white,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5
  },
  replyPostContainer: {
    marginLeft: getWidthPercentage(7),
    backgroundColor: colors.white,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5
  },
  mailFrom: {
    ...font(14, 'Bold'),
    color: colors.charcoalGrey
  },
  mailFromColored: {
    ...font(14, 'Bold'),
    color: colors.tealBlue
  },
  replyMailFrom: {
    ...font(13, 'Bold'),
    lineHeight: getHeightPercentage(2.44),
    color: colors.charcoalGrey
  },
  actionText: {
    ...font(14, 'Light'),
    color: colors.charcoalGrey
  },
  replyActionText: {
    ...font(14, 'Light'),
    color: colors.charcoalGrey
  },
  actionTextSmall: {
    ...font(13, 'Light'),
    color: colors.charcoalGrey
  },
  firstLetterContainer: {
    backgroundColor: colors.firstLetterBg,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  replyFirstLetterContainer: {
    backgroundColor: colors.firstLetterBg,
    width: 27,
    height: 27,
    borderRadius: 13.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  extraSmall: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  firstLetterText: {
    ...font(16),
    color: colors.white
  },
  replyFirstLetterText: {
    ...font(11),
    color: colors.white
  },
  firstLetterTextSmall: {
    ...font(12),
    color: colors.white
  },
  postTop: {
    flexDirection: 'row'
  },
  altHeight: {
    height: getHeightPercentage(7)
  },
  postTopAlt: {
    flex: 1,
    flexDirection: 'row',
    height: getHeightPercentage(12)
  },
  postTopLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  postTopCenter: {
    flex: 7,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 5
  },
  allTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  postTopCenterAlt: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 5
  },
  timeText: {
    color: colors.titleTextColor,
    ...font(12, 'Light')
  },
  replyTimeText: {
    color: colors.titleTextColor,
    ...font(12, 'Light')
  },
  postText: {
    ...font(14),
    color: colors.charcoalGrey
  },
  iconSpaceLeft: {
    paddingLeft: 2
  },
  iconSpaceRight: {
    marginRight: 7.5,
  },
  postInfoText: {
    ...font(12),
    color: colors.charcoalGrey
  },
  postInfoTextAlt: {
    ...font(13),
    color: colors.charcoalGrey
  },
  postInfoTextColored: {
    ...font(12),
    color: colors.tealBlue
  },
  disabledView: {
    opacity: 0.3,
    backgroundColor: colors.white
  },
  postArea: {
    flex: 2,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 10
  },
  replyPostArea: {
    borderColor: colors.veryLightPink,
    backgroundColor: colors.streamBg,
    borderWidth: 0.5,
    alignSelf: 'flex-start',
    paddingHorizontal: 7.5,
    paddingVertical: 12,
    width: getWidthPercentage(85),
    marginTop: 5,
    marginLeft: 35
  },
  replyPostAreaAlt: {
    borderColor: colors.veryLightPink,
    backgroundColor: colors.streamBg,
    borderWidth: 0.5,
    alignSelf: 'flex-start',
    paddingHorizontal: 7.5,
    paddingVertical: 12,
    width: getWidthPercentage(80),
    marginTop: 5,
    marginLeft: 35
  },
  postAreaAlt: {
    flex: 2,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 5
  },
  postBottom: {
    flex: 1
  },
  replyPostBottom: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 35,
    paddingVertical: 10,
    width: '100%',
  },
  replyPostBottomAlt: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 35,
    paddingVertical: 10,
    width: '100%',
  },
  postBottomTop: {
    flex: 1,
    width: getWidthPercentage(92.85),
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.modalOptionBorder,
    paddingBottom: 7.5
  },
  postBottomWithoutTop: {
    flex: 1,
    width: getWidthPercentage(92.85),
    flexDirection: 'row'
  },
  postBottomBottom: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  postReplyBottom: {
    flex: 1,
    paddingVertical: 10,
  },
  postReplyInput: {
    height: 40,
    width: getWidthPercentage(58),
    borderColor: colors.lightBlueGrey,
    backgroundColor: colors.streamBg,
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  postReplyInputMain: {
    height: 60,
    width: getWidthPercentage(100),
    borderColor: colors.lightBlueGrey,
    backgroundColor: colors.streamBg,
    borderWidth: 1,
    padding: 10
  },
  actionButtons: {
    padding: 5,
    flexDirection: 'row'
  },
  commentContainer: {
    borderColor: colors.veryLightPink,
    backgroundColor: colors.streamBg,
    borderWidth: 0.5,
    paddingHorizontal: 7.5,
    paddingVertical: 10,
    width: getWidthPercentage(82),
    marginTop: 5
  },
  replyActionButton: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  postActionButton: {
    flex: 1,
    flexDirection: 'row'
  },
  replyPostActionButton: {
    flexDirection: 'row',
    paddingRight: 5
  },
  placeholderStyle: {
    ...font(13),
    color: colors.placeholderColor
  },
  formsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.modalOptionBorder,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  formListText: {
    ...font(14),
    color: colors.charcoalGrey,
    marginLeft: 10
  },
  listCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formTitle: {
    ...font(16),
    color: colors.charcoalGrey,
    padding: 25,
    paddingBottom: 5
  },
  formTitleBold: {
    ...font(16, 'Bold'),
    color: colors.charcoalGrey,
    padding: 25,
    paddingBottom: 5
  },
  textTitle: {
    ...font(16),
    color: colors.charcoalGrey
  },
  reviewTitle: {
    ...font(16),
    color: colors.titleTextColor
  },
  mileInputStyle: {
    height: getHeightPercentage(5),
    width: getWidthPercentage(12),
    borderBottomWidth: 1.5,
    borderBottomColor: colors.dateTimeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    ...font(16, 'Light'),
    color: colors.charcoalGrey,
    marginRight: 5,
    padding: 0
  },
  placePicker: {
    marginLeft: 5,
    height: getHeightPercentage(5),
    width: getWidthPercentage(60),
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)'
  },
  postItemText: {
    ...font(14),
    flexWrap: 'wrap',
    color: colors.tealBlue
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  mangeTimeTitle: {
    ...font(14),
    color: colors.titleTextColor,
    marginLeft: 25
  },
  manageTimeTop: {
    paddingTop: 20,
    marginBottom: 5
  },
  manageTimeBottom: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingTop: 20
  },
  timeListText: {
    ...font(13),
    color: colors.charcoalGrey
  },
  timeListSubContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  timeListSubContainerAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  timeListContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.modalOptionBorder,
    paddingVertical: 10,
    paddingHorizontal: 25
  },
  serviceTitleContainer: {
    backgroundColor: colors.tealBlue,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingRight: 60
  },
  serviceTitle: {
    ...font(22),
    color: colors.white,
    marginLeft: 24
  },
  serviceProviderTitle: {
    ...font(16),
    color: colors.white,
    marginLeft: 24,
    marginTop: 10
  },
  addressContainer: {
    flexDirection: 'row',
    marginLeft: 24,
    marginBottom: 16,
    marginTop: 10
  },
  btnPadding: {
    padding: 10
  },
  userAavatar: {
    height: 30,
    width: 30,
    borderRadius: 50
  },
  buttonSeparator: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    height: 40
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 45,
    left: 5,
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.streamBg,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'ios' ? 2 : 15,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: alpha(colors.black, 0.4),
    zIndex: 999
  },
  overlayContainerAlt: {
    position: 'absolute',
    bottom: 45,
    right: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.streamBg,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'ios' ? 2 : 15,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: alpha(colors.black, 0.4),
    zIndex: 999
  },
  overlayContainerReplyHeader: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.borderColorGrey,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'ios' ? 2 : 15,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: alpha(colors.black, 0.4),
    zIndex: 999
  },
  overlayContainerReplyPost: {
    position: 'absolute',
    bottom: 30,
    left: 120,
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.borderColorGrey,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'ios' ? 2 : 15,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: alpha(colors.black, 0.4),
    zIndex: 999
  },
  overlayContainerReplyPostResponses: {
    position: 'absolute',
    bottom: 40,
    left: 120,
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.borderColorGrey,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'ios' ? 2 : 15,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: alpha(colors.black, 0.4),
    zIndex: 999
  },
  overlayContainerTask: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.borderColorGrey,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'ios' ? 2 : 15,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: alpha(colors.black, 0.4),
    zIndex: 999
  },
  columnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  countText: {
    ...font(16, 'Bold'),
    color: colors.charcoalGrey
  },
  buttonTextOverlay: {
    ...font(16, 'Light'),
    color: colors.charcoalGrey
  },
  imageContainer: {
    backgroundColor: colors.findCardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  retryButton: {
    backgroundColor: colors.coralPink,
    height: 30,
    paddingHorizontal: 20,
    marginBottom: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  retryButtonText: {
    ...font(14, 'Bold'),
    color: colors.white
  }
});
